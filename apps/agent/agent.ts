import {
  generateText,
  tool,
  stepCountIs,
  type ToolContent,
  type ModelMessage,
} from "ai";
import { z } from "zod";
import dotenv from "dotenv";
import { createOpenAI } from "@ai-sdk/openai";
import { bashTool } from "./tools/bash.js";
import { readTool } from "./tools/read.js";
import { writeTool } from "./tools/write.js";
import { editTool } from "./tools/edit.js";
import { globTool } from "./tools/glob.js";
import { grepTool } from "./tools/grep.js";
import prompt from "prompt";
import readline from "readline";

dotenv.config();

const glm = createOpenAI({
  apiKey: process.env.ZAI_API_KEY!,
  baseURL: "https://api.z.ai/api/coding/paas/v4/",
});

let chatContext: ModelMessage[] = [];

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: "You: ",
});

console.log("Welcome to CodeGenie AI Agent! Type 'exit' to quit.");
rl.prompt();

rl.on("line", async (line) => {
  const userPrompt = line.trim();
  if (userPrompt.toLowerCase() === "exit") {
    rl.close();
    return;
  }
  chatContext.push({ role: "user", content: userPrompt });
  await agent(userPrompt, chatContext);
});

export const agent = async (
  userPrompt: string,
  chatContext: ModelMessage[]
) => {
  console.log(chatContext);
  const result = await generateText({
    model: glm.chat("glm-4.6"),
    system:
      "You are a senior software engineer, which has 10 years of experience in programming languages like javascript, nodejs, python, java, c++, c#, etc and frameworks like react, angular, vue, etc. You are an AI agent which can perform tasks for the user super intelligently, you can figure out the best way to do a task and perform it. Analyze the user prompt, figure out what the user want to do and perform it. You can use available tools as per your need. If you can not do a task say so, also tell the reason why you failed, and how can you solve this problem. remember, ignore node_modules and dist directories while performing tasks, they should not be included in the output or input.",
    messages: chatContext,
    tools: {
      bash: bashTool,
      read: readTool,
      write: writeTool,
      edit: editTool,
      glob: globTool,
      grep: grepTool,
    },
    onStepFinish({ text, toolCalls, toolResults, finishReason, usage }) {
      console.log("--------------------------------------------------");
      console.log("toolCalls:", toolCalls);
      console.log("toolResults:", toolResults);
      console.log("finishReason:", finishReason);
      console.log("AI:", text);
      console.log("--------------------------------------------------\n");

      // Add tool calls and results to context
      toolCalls.forEach((call, index) => {
        chatContext.push({
          role: "user",
          content: `Tool Call: ${call.toolName} with input ${JSON.stringify(
            call.input
          )}`,
        });
        chatContext.push({
          role: "assistant",
          content: `Tool Result: ${JSON.stringify(toolResults[index])}`,
        });
      });
    },

    stopWhen: stepCountIs(10),
  });
  console.log("AI:", result.text);
  // Add AI response to context
  chatContext.push({ role: "assistant", content: result.text });
  //   console.log("--------------------------------------------------\n");
  //   console.log("Chat Context:", chatContext);
};
