import { createAuthClient } from "better-auth/react"
export const authClient = createAuthClient({
    // The base URL of the server
    baseURL: "http://localhost:3001"
});

export const { signIn, signUp, signOut, getSession, useSession } = authClient;