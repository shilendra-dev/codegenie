import { createAuthClient } from "better-auth/react"

export const authClient = createAuthClient({
    // The base URL of the server
    baseURL: "http://localhost:3001"
});

export const googleSignIn = async () => {
    const data = await authClient.signIn.social({
        provider: 'google',
        callbackURL: 'http://localhost:3000/build',
    });
    return data;
}

export const githubSignIn = async () => {
    const data = await authClient.signIn.social({
        provider: 'github',
        callbackURL: 'http://localhost:3000/build',
    });
    return data;
}

export const { signIn, signUp, signOut, getSession, useSession } = authClient;