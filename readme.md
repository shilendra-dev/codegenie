# CodeGenie Agent

An intelligent AI-powered software engineering agent that can analyze, understand, and execute various programming tasks autonomously.

## Features

- **AI-Powered**: Uses Vercel's AI SDK and multi-model support for intelligent task understanding and execution
- **Multi-Tool Support**: Equipped with various development tools for comprehensive code manipulation
- **Secure Operations**: Implements robust security measures including path validation and glob pattern sanitization
- **TypeScript**: Built with modern TypeScript for type safety and better developer experience

## Available Tools

### Core Development Tools
- **Bash Tool** (`tools/bash.ts`): Execute shell commands with timeout protection
- **Read Tool** (`tools/read.ts`): Read file contents safely
- **Write Tool** (`tools/write.ts`): Create and modify files
- **Edit Tool** (`tools/edit.ts`): Perform targeted file edits
- **Glob Tool** (`tools/glob.ts`): Search files using glob patterns with security validation
- **Grep Tool** (`tools/grep.ts`): Search within file contents

### Security Features
- **Path Validation** (`utils/safePath.ts`): Prevents directory traversal attacks
- **Glob Pattern Sanitization** (`utils/valGlobPattern.ts`): Validates and sanitizes file patterns
- **Input Validation**: Comprehensive validation using Zod schemas

## =� Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- OpenAI API key

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd codegenie/agent
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
Create a `.env` file in the `agent` directory:
```
OPENAI_API_KEY=your_openai_api_key_here
```

### Usage

Run the agent:
```bash
npm start
```

The agent will prompt you for a task description. Example tasks:
- "Create a new React component for user authentication"
- "Find all TypeScript files with TODO comments"
- "Refactor the utils directory to use ES6 modules"
- "Add unit tests for the validation functions"

## =' Configuration

### Environment Variables
- `OPENAI_API_KEY`: Your OpenAI API key (required)
OR - Choose your own model from ai sdk

### Tool Limits
- Maximum bash command timeout: 120 seconds
- Maximum glob pattern length: 200 characters
- Maximum glob results: 100 files
- Maximum agent steps: 10 per task

## =� Security

The agent implements multiple security layers:

1. **Path Validation**: Prevents access to system directories and parent directory traversal
2. **Pattern Sanitization**: Validates glob patterns to prevent injection attacks
3. **Input Validation**: Uses Zod schemas to validate all inputs
4. **Ignored Directories**: Automatically excludes `node_modules` and `dist` directories

## =� Dependencies

### Core Dependencies
- `ai`: AI SDK for model integration
- `@ai-sdk/openai`: OpenAI provider
- `zod`: Schema validation
- `fast-glob`: Efficient file pattern matching
- `dotenv`: Environment variable management

### Development Dependencies
- `tsx`: TypeScript execution
- `@types/node`: Node.js type definitions
- `typescript`: TypeScript compiler

## > Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## =� License

ISC License

## =
 Examples

### Example 1: File Search
```bash
User: "Find all TypeScript files in the src directory"
Agent: Uses glob tool to search for `**/*.ts` patterns
```

### Example 2: Code Analysis
```bash
User: "Analyze the authentication logic in the codebase"
Agent: Uses grep and read tools to examine auth-related code
```

### Example 3: Refactoring
```bash
User: "Convert all require() statements to ES6 imports"
Agent: Uses glob to find JS files, read to examine content, and edit to make changes
```

## = Troubleshooting

### Common Issues
1. **API Key Error**: Ensure your OpenAI API key is correctly set in `.env`
2. **Permission Denied**: Check file permissions for target directories
3. **Pattern Validation Failed**: Ensure glob patterns are valid and don't contain dangerous sequences

### Debug Mode
The agent logs all tool executions and responses to help with debugging.

---

Built with d by the CodeGenie team