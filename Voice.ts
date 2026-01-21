import { z } from "zod";
import { NTVoiceSchema } from "./NTVoice";
import { OTVerbStemSchema } from "./OTVerbStem";

export const VoiceSchema = z.enum([...NTVoiceSchema.options, ...OTVerbStemSchema.options] as const);
export type Voice = z.infer<typeof VoiceSchema>;