import { tool } from "ai";
import { z } from "zod";
import fs from "fs";
import editDescription from "./descriptions/edit.js";

export const editTool = tool({
    description: editDescription,

    inputSchema: z.object({
        path: z.string().describe("Path to the file to edit"),
        search: z.string().describe("String or regex pattern to find"),
        replace: z.string().describe("Replacement string"),
        regex: z.boolean().optional().describe("Whether 'search' should be treated as a regex pattern"),
    }),

    async execute({ path, search, replace, regex = false }) {
        try {
            const fileContent = fs.readFileSync(path, "utf-8");
            let newContent: string;

            if (regex) {
                const pattern = new RegExp(search, "g");
                newContent = fileContent.replace(pattern, replace);
            } else {
                newContent = fileContent.split(search).join(replace);
            }

            fs.writeFileSync(path, newContent, "utf-8");

            return {
                success: true,
                message: `File updated successfully.`,
                originalContent: fileContent,
                newContent,
            };
        } catch (err: any) {
            return {
                success: false,
                message: err.message,
                originalContent: null,
                newContent: null,
            };
        }
    },
});
