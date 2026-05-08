/* eslint-disable @typescript-eslint/no-explicit-any */

import { PublicationFootnoteType } from "./PublicationFootnoteType";
import { PublicationGreekWordElement } from "./PublicationGreekWordElement";
import { PublicationHebrewWordElement } from "./PublicationHebrewWordElement";
import logger from "@lib/logger";

type FootnoteFunction = (element: any) => PublicationFootnoteType;

export class FootnoteTypeResolver {
    private defaultFunction: FootnoteFunction;

    private constructor(functionText: string | undefined, dummyContext: any, defaultFunction: FootnoteFunction) {
        this.defaultFunction = defaultFunction;
    }

    getFootnoteType(element: any) {
        return this.defaultFunction(element);
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