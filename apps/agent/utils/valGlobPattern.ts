import fg from "fast-glob";

const MAX_GLOB_PATTERN_LENGTH = 200;
const MAX_RECURSION_DEPTH = 10;
const MAX_BRACE_EXPANSIONS = 50;

const DANGEROUS_PATTERNS = [
  /\.\./, // Parent directory traversal
  /^\/.*root/, // System root access
  /^\/etc/, // System config
  /^\/usr/, // System binaries
  /^\/bin/, // System binaries
  /^\/sbin/, // System admin binaries
  /^\/var/, // System data
  /^\*\*\/\*\*.*\*\*/, // Excessive recursion
  /\{.*\{.*\}/, // Nested brace expansion
];

export function validateGlobPattern(pattern: string): {
  valid: boolean;
  error?: string;
} {
  // checking length not too long
  if (pattern.length > MAX_GLOB_PATTERN_LENGTH) {
    return { valid: false, error: "Pattern exceeds maximum length" };
  }

  // sanitizing pattern
  const cleanPattern = sanitizeGlobPattern(pattern);

  // checking dangerous patterns
  for (const dangerous of DANGEROUS_PATTERNS) {
    if (dangerous.test(cleanPattern)) {
      return {
        valid: false,
        error: "Pattern contains potentially dangerous sequences",
      };
    }
  }

  // verify it is a glob pattern
  try {
    fg.generateTasks(cleanPattern, { cwd: process.cwd() });
  } catch (error) {
    return { valid: false, error: "Invalid glob pattern" };
  }

  return { valid: true };
}

export function sanitizeGlobPattern(pattern: string): string {
  // Remove any potentially dangerous characters or sequences
  pattern = pattern.replace(/[\x00-\x1F\x7F]/g, ""); //prevents control characters, injection
  pattern = pattern.replace(/\\/g, "/"); // Normalize backslashes to forward slashes, ensures consistent path separators
  pattern = pattern.replace(/\*{10,}/g, "*********"); // Limit consecutive asterisks to 9

  return pattern;
}
