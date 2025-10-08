const lsDescription = `
Lists files and directories in a specified path with various formatting options.

This tool provides a secure way to browse directory contents without using bash commands.

Usage notes:
- The path parameter is optional - if not provided, lists current directory
- Automatically filters out node_modules and dist directories for security
- Supports both simple and detailed (ls -la style) output formats
- Can show hidden files (starting with .) when requested
- Supports recursive directory listing
- Returns structured data that's easier to parse than bash output

Examples:
- List current directory: ls()
- List specific directory: ls({path: "src"})
- Detailed view with permissions: ls({longFormat: true})
- Include hidden files: ls({showHidden: true})
- Recursive listing: ls({recursive: true})

Always prefer this tool over bash "ls" commands for directory browsing.
`;

export default lsDescription;