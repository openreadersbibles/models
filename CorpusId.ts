import { z } from "zod";
import { Canon } from "./Canon";

export const CorpusIdSchema = z.string();
export type CorpusId = z.infer<typeof CorpusIdSchema>;

const DefaultNTCorpus = '4d1d4fbcb6db8521476204151ab544e5e1b58bb6';
const DefaultOTCorpus = '2021';
const DefaultLXXCorpus = '';

export function getFallbackCorpus(canon: Canon): CorpusId {
    switch (canon) {
        case 'OT':
            return DefaultOTCorpus;
        case 'NT':
            return DefaultNTCorpus;
        case 'LXX':
            return DefaultLXXCorpus;
    }
}
