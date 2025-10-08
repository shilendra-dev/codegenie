import { tool } from "ai";
import { z } from "zod";
import fs from 'fs';
import writeDescription from "./descriptions/write.js";

export const writeTool = tool({
    description: writeDescription,
    inputSchema: z.object({
        path: z.string().describe('The path to the file to write'),
        content: z.string().describe('The content to write to the file'),
    }),
    execute: async ({ path, content }) => {
        try {
            fs.writeFileSync(path, content);
            return { success: true };
        } catch (error: any) {
            return { success: false, error: error.message };
        }
    },
})