import { tool } from "ai";
import { z } from "zod";
import { exec, execFile } from "child_process";
import { promisify } from "util";
import safePath from "../utils/safePath.js";
import lsDescription from "./descriptions/ls.js";
const execFileAsync = promisify(execFile);

export const lsTool = tool({
    description: lsDescription,
    inputSchema: z.object({
        path: z.string().optional().describe('The path to list the contents of'),
        longFormat: z.boolean().optional().default(false).describe('Whether to use long format (like ls -la), showing permissions, sizes, etc.'),
        recursiveList: z.boolean().optional().default(false).describe('Whether to list directories recursively'),
        showHidden: z.boolean().optional().default(false).describe('Whether to include hidden files (those starting with .)'),
    }),
    execute: async ({ path, longFormat, recursiveList, showHidden }) => {
        try {
            let safePathResolved;
            let args = [];
            
            if(longFormat) args.push('-la');
            else if(showHidden) args.push('-a');
            if(recursiveList) args.push('-R');

            const execOptions = {
                timeout: 10_000, //10seconds
                maxBuffer: 2* 1024 * 1024, //2MB result cap
            };

            if (path) {
                safePathResolved = safePath(path);
                args.push(safePathResolved);

                const { stdout, stderr } = await execFileAsync('ls', args, execOptions);
                return { stdout, stderr };
            }

            const { stdout, stderr } = await execFileAsync('ls', execOptions);
            return { stdout, stderr };
        } catch (error: any) {
            return { error: error.message };
        }
    }
})