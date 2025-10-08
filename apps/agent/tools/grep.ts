import { tool } from "ai";
import { z } from "zod";
import fs from "fs";
import grepDescription from "./descriptions/grep.js";

export const grepTool = tool({
  description: grepDescription,
  inputSchema: z.object({
    path: z.string().describe("Path to the file to search (can be a single file or glob pattern)"),
    search: z.string().describe("String or regex pattern to search for"),
    regex: z.boolean().optional().describe("Whether to treat 'search' as a regex pattern"),
  }),
  outputSchema: z.object({
    matches: z.array(
      z.object({
        lineNumber: z.number(),
        line: z.string(),
      })
    ),
    totalMatches: z.number(),
  }),
  execute: async ({ path, search, regex = false }) => {
    try {
      const content = fs.readFileSync(path, "utf-8");
      const lines = content.split("\n");
      const matches: { lineNumber: number; line: string }[] = [];

      const pattern = regex ? new RegExp(search) : null;

      lines.forEach((line, idx) => {
        if ((regex && pattern!.test(line)) || (!regex && line.includes(search))) {
          matches.push({ lineNumber: idx + 1, line });
        }
      });

      return { matches, totalMatches: matches.length };
    } catch (err: any) {
      return { matches: [], totalMatches: 0 };
    }
  },
});
