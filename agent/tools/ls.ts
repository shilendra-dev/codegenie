import { tool } from "ai";
import { z } from "zod";
import { exec, execFile } from "child_process";
import { promisify } from "util";
import safePath from "../utils/safePath.js";
const execFileAsync = promisify(execFile);

export const lsTool = tool({
    description: 'Lists files and directories in a given path.',
    inputSchema: z.object({
        path: z.string().optional().describe('The path to list the contents of'),
    }),
    execute: async ({ path }) => {
        try {
            let safePathResolved;
            let args = [];

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