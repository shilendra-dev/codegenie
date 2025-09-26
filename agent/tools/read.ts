import { tool } from "ai";
import { z } from "zod";
import fs from 'fs';
import readDescription from "./descriptions/read.js";

export const readTool = tool({
    description: readDescription,
    inputSchema: z.object({
        path: z.string().describe('The path to the file to read'),
        offset: z.number().optional().describe('The offset to start reading from'),
        limit: z.number().optional().describe('The limit of the file to read'),
    }),

    execute: async ({ path, offset, limit }) => {
        try{
            const file = fs.readFileSync(path, 'utf-8');
            if(offset && limit){
                const content = file.slice(offset, offset + limit);
                return `${content}`;
            }
            return {file};
        }catch(error: any){
            return {error: error.message};
        }
    }
})