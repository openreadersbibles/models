/* eslint-disable @typescript-eslint/no-explicit-any */

import { PublicationFootnoteType } from "./PublicationFootnoteType";
import { PublicationGreekWordElement } from "./PublicationGreekWordElement";
import vm from 'node:vm';
import { PublicationHebrewWordElement } from "./PublicationHebrewWordElement";
import logger from "@lib/logger";

type FootnoteFunction = (element: any) => PublicationFootnoteType;

export class FootnoteTypeResolver {
    private defaultFunction: FootnoteFunction;
    private functionText: string | undefined;
    private compiledScript: any;
    private sandbox: any;
    private dummyContext: any;

    private constructor(functionText: string | undefined, dummyContext: any, defaultFunction: FootnoteFunction) {
        logger.info(`Constructing FootnoteTypeResolver with ${functionText}`);
        this.defaultFunction = defaultFunction;
        this.functionText = functionText;
        if (this.functionText) {
            logger.info(`Setting compiledScript`);
            this.compiledScript = new vm.Script(this.functionText);
        }
        this.dummyContext = dummyContext;

        this.sandbox = vm.createContext({ ctx: dummyContext });
    }

    getFootnoteType(element: any) {
        if (this.functionText) {
            return this.runCustomFunction(element);
        } else {
            return this.defaultFunction(element);
        }
    }

    private runCustomFunction(element: any) {
        const patch: { [key: string]: string } = {};
        Object.keys(this.dummyContext).forEach((key) => {
            patch[key] = element[key];
        });
        Object.assign(this.sandbox, patch);
        return this.compiledScript.runInContext(this.sandbox, { timeout: 100 });
    }

    static CreateNTFootnoteTypeFunction(userFunctionText: string | undefined): FootnoteTypeResolver {
        logger.info(`Constructing CreateNTFootnoteTypeFunction with ${userFunctionText} from the original source`);
        const dummyContext = {
            isVerb: true,
            isSubstantive: false,
            tense: "present",
            voice: "active",
            mood: "indicative",
            belowFrequencyThreshold: true,
            FootnoteType: PublicationFootnoteType,
        };
        const completeFunctionText = `(function(context) {
                    const { isVerb, isSubstantive, mood,
                            tense, voice, belowFrequencyThreshold,
                            FootnoteType } = context;
                    ${userFunctionText}
                    })(ctx)`;
        return new FootnoteTypeResolver(
            userFunctionText ? completeFunctionText : undefined,
            dummyContext,
            PublicationGreekWordElement.defaultFootnoteFunction
        );
    }

    static CreateOTFootnoteTypeFunction(userFunctionText: string | undefined): FootnoteTypeResolver {
        logger.info(`Constructing CreateOTFootnoteTypeFunction with ${userFunctionText} from the original source`);
        const dummyContext = {
            isVerb: true,
            isSubstantive: false,
            lex_id: 1,
            isInteroggative: true,
            verbStem: "qal",
            belowFrequencyThreshold: true,
            FootnoteType: PublicationFootnoteType,
        };
        const completeFunctionText = `(function(context) {
                    const { isVerb, isSubstantive, lex_id,
                            isInteroggative, verbStem, belowFrequencyThreshold,
                            FootnoteType } = context;
                    ${userFunctionText}
                    })(ctx)`;
        return new FootnoteTypeResolver(
            userFunctionText ? completeFunctionText : undefined,
            dummyContext,
            PublicationHebrewWordElement.defaultFootnoteFunction
        );
    }

}