import { z } from "zod";

export const WrappedBodySchema = z.object({
    body: z.unknown(),
    hash: z.string(),
});

export type WrappedBody<T> = z.infer<typeof WrappedBodySchema> & { body: T };
