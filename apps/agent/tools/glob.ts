import { tool } from "ai";
import fg from "fast-glob";
import { z } from "zod";
import globDescription from "./descriptions/glob.js";
import safePath from "../utils/safePath.js"
import { validateGlobPattern } from "../utils/valGlobPattern.js";

const globInputSchema = z.object({
    pattern: z.string()
        .min(1, "Pattern cannot be empty")
        .max(200, "Pattern is too long")
        .refine(pattern => validateGlobPattern(pattern).valid, { message: "Invalid or potentially dangerous glob pattern" })
        .describe('The pattern to match against'),
    path: z.string().optional().describe('The path to search in'),
    maxResults: z.number().min(1).max(1000).default(100).describe('Maximum number of results to return'),
})

export const globTool = tool({
    description: globDescription,
    inputSchema: globInputSchema,
    execute: async ({ pattern, path, maxResults }) => {
        try {
            const options = path ? { cwd: safePath(path), ignore: ['node_modules/**', 'dist/**'], absolute: true } : { ignore: ['node_modules/**', 'dist/**'], absolute: true };
            const files = await fg(pattern, options);
            return files.slice(0, maxResults);
        } catch (error: any) {
            return { error: error.message };
        }
    },
});