import { generateText, tool, stepCountIs } from "ai";
import { openai } from "@ai-sdk/openai";
import { z } from "zod";
import dotenv from 'dotenv';
import { bashTool } from "./tools/bash.js";
import { readTool } from "./tools/read.js";
dotenv.config();

export const agent = async () => {
    const { text } = await generateText({
        model: openai('gpt-4o'),
        system: 'You are a senior software engineer, which has 10 years of experience in programming languages like javascript, nodejs, python, java, c++, c#, etc and frameworks like react, angular, vue, etc. Only respond with code. You are an AI agent which can perform tasks for the user super intelligently, you can figure out the best way to do a task and perform it. Analyze the user prompt, figure out what the user want to do and perform it. You can use available tools as per your need. If you can not do a task say so, also tell the reason why you failed, and how can you solve this problem.',
        prompt: 'read the content of the file agent.ts and write it to a new file',
        tools: {    
            bash: bashTool,
            read: readTool
        },
        stopWhen: stepCountIs(10),
    });
    console.log(text);
}

agent();

