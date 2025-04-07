import { AnnotationJsonObject } from "./Annotation";
import { PhraseGlossLocationObject, WordGlossLocationObject } from "./gloss-locations";
import { ProjectConfigurationRow } from "./ProjectConfiguration";

export interface ProjectPackage {
    project: ProjectConfigurationRow;
    new_project: boolean;
}

export interface UpdateVerseData {
    word_gloss_updates: GlossSendObject[];
    phrase_gloss_updates: GlossSendObject[];
}

export interface GlossRow {
    jsonContent: string;
    gloss_id: number;
    votes: number;
}

export interface PhraseGlossRow {
    phrase_gloss_id: number;
    from_word_id: number;
    to_word_id: number;
    markdown: string;
    votes: number;
    myVote: number;
}

export interface GlossSendObject {
    annotationObject: AnnotationJsonObject;
    gloss_id: number;
    myVote: 0 | 1;
    location: WordGlossLocationObject | PhraseGlossLocationObject;
}
