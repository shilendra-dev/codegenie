import { tool } from "ai";
import { z } from "zod";
import { exec } from "child_process";
import { promisify } from "util";
import bashDescription from "./descriptions/bash.js";

const execAsync = promisify(exec);

const bashInputSchema = z.object({
    command: z.string().describe('The bash command to execute'),
    timeout: z.number().optional().describe('The timeout in milliseconds'),
})

export const bashTool = tool({
    description: bashDescription,
    inputSchema: bashInputSchema,
    execute: async ({ command, timeout }) => {
        try {
            const { stdout, stderr } = await execAsync(command, {
                timeout: timeout || 120000,
                shell: '/bin/bash',
            })
            return {
                success: true,
                output: stdout.trim(),
                error: stderr.trim() || null,
            }
        } catch (error: any) {
            return {
                success: false,
                output: null,
                error: error.stderr?.toString().trim() || error.message,
            }
        }
    }
})