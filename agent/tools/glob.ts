import { tool } from "ai";
import { globSync } from "fs";
import { z } from "zod";
import globDescription from "./descriptions/glob.js";

export const globTool = tool({
    description: globDescription,
    inputSchema: z.object({
        pattern: z.string().describe('The pattern to match against'),
        path: z.string().optional().describe('The path to search in'),
    }),
    execute: async ({ pattern, path }) => {
        try {
            const files = globSync(pattern, { cwd: path });
            return files;
        } catch (error: any) {
            return { error: error.message };
        }
    },
});