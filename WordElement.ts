import { Gloss } from "./Gloss.js";
import { GlossLocation } from "./gloss-locations.js";
import { BiblicalLanguage } from "./Verse.js";
import { UserId } from "./UserProfile.js";
import { GlossContainer } from "./GlossContainer.js";
import { Voice } from "./Voice.js";

export interface WordElement extends GlossContainer {
    get text(): string;
    get frequency(): number;
    get glossSuggestions(): Gloss[];
    setVote(gloss: Gloss, user_id: UserId): void;
    addNewGloss(gloss: Gloss, votedFor: boolean, user_id: UserId): void;
    hasChangedGlosses(): boolean;
    changedGlosses(): Gloss[];
    get word_id(): number;
    get lex_id(): number;
    /// NB: this stands for either Greek voice or Hebrew binyan
    get voice(): Voice;
    copyOf(): WordElement;
    markGlossesAsUnchanged(): void;
    location(): GlossLocation;
    parsingSummary(): Map<string, string>;
    get language(): BiblicalLanguage;
    get hasEmptyGloss(): boolean;
    userHasVoted(user_id: UserId): boolean;
}
