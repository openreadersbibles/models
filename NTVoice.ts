import { z } from "zod";

// Define NTVoice schema
export const NTVoiceSchema = z.enum(["NA", "active", "middle", "passive"]);
export type NTVoice = z.infer<typeof NTVoiceSchema>;
