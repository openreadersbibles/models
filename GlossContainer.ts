import { Gloss } from "./Gloss";
import { UserId } from "./UserProfile";

export interface GlossContainer {
    copyOf(): GlossContainer;
    setVote(gloss: Gloss, user_id: UserId): void;
    removeGloss(gloss: Gloss): void;
    replaceGloss(gloss: Gloss): void;
}
