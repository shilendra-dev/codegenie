import { generateText, tool, stepCountIs } from "ai";
import { openai } from "@ai-sdk/openai";
import { z } from "zod";
import dotenv from 'dotenv';
import { bashTool } from "./tools/bash.js";
import { readTool } from "./tools/read.js";
import { writeTool } from "./tools/write.js";
import { editTool } from "./tools/edit.js";
import { globTool } from "./tools/glob.js";
import { grepTool } from "./tools/grep.js";
import prompt from "prompt";

dotenv.config();

let { userPrompt }: { userPrompt: string } = await prompt.get(['userPrompt'])

export const agent = async () => {
    const { text, response } = await generateText({
        model: openai('gpt-4'),
        system: 'You are a senior software engineer, which has 10 years of experience in programming languages like javascript, nodejs, python, java, c++, c#, etc and frameworks like react, angular, vue, etc. Only respond with code. You are an AI agent which can perform tasks for the user super intelligently, you can figure out the best way to do a task and perform it. Analyze the user prompt, figure out what the user want to do and perform it. You can use available tools as per your need. If you can not do a task say so, also tell the reason why you failed, and how can you solve this problem. remember, ignore node_modules and dist directories while performing tasks, they should not be included in the output or input.',
        prompt: userPrompt,
        tools: {  
            bash: bashTool,
            read: readTool,
            write: writeTool,
            edit: editTool,
            glob: globTool,
            grep: grepTool
        },
        stopWhen: stepCountIs(10),
        
    });
    
    console.log(text);
    console.log(response.messages);
    for (let i = 0; i < response.messages.length; i++) {
        console.log(response.messages[i].content);
    }
}

agent();
