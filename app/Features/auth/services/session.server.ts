import { createCookieSessionStorage, redirect } from "react-router";

const sessionSecret = process.env.SESSION_SECRET;

if (!sessionSecret) {
    throw new Error("SESSION_SECRET must be set in .env");
}
const storage = createCookieSessionStorage({
    cookie: {
       name: "app_session",
       httpOnly: true,
       secure: process.env.NODE_ENV === "production",
       sameSite: "lax",
       path: "/",
       maxAge: 60 * 60 * 24 * 30, 
       secrets: [sessionSecret],
    },
});

export async function createUserSession(userId: number, redirectTo: string) {
    const session = await storage.getSession();
    session.set("userId", userId);

    return redirect(redirectTo, {
    headers: {
        "Set-Cookie": await storage.commitSession(session),
      },
    });
}

export async function getUserId(request: Request): Promise<number | undefined> {
    const session = await storage.getSession(request.headers.get("Cookie"));
    return session.get("userId");
}

export async function requireUserId(request: Request): Promise<number> {
    const userId = await getUserId(request);

    if (!userId) {
        const url = new URL(request.url);
        const searchParams = new URLSearchParams([["redirectTo", url.pathname]]);
        throw redirect(`/login?${searchParams}`);
    }

    return userId;
}

export async function logout(request: Request) {
    const session = await storage.getSession(request.headers.get("Cookie"));

    return redirect("/login", {
        headers: {
            "Set-Cookie": await storage.destroySession(session),
        },
    });
}