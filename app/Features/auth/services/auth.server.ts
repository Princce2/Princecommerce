import { randomBytes, scryptSync, timingSafeEqual } from "crypto";
import {eq } from "drizzle-orm";
import { db } from "~/db/index.server";
import { users } from "~/db/schema";

const KEY_LENGTH = 64;

export function hashPassword(password: string): string {
    const salt = randomBytes(16).toString("hex");
    const hash = scryptSync(password, salt, KEY_LENGTH).toString("hex");
    return `${salt}:${hash}`;
}
    
export function verifyPassword(password: string, storedHash: string): boolean {
    const [salt, hash] = storedHash.split(":");
    const hashToVerify = scryptSync(password, salt, KEY_LENGTH);
    const storedHashBuffer = Buffer.from(hash, "hex");

    if (hashToVerify.length !== storedHashBuffer.length) {
        return false;
    }

    return timingSafeEqual(hashToVerify, storedHashBuffer);
}

export async function getUserByEmail(email: string) {
    return db.select().from(users).where(eq(users.email, email)).get()
}

export async function createUser({
    name,
    email,
    password,
}: {
    name: string;
    email: string;
    password: string;
}) {
    const passwordHash = hashPassword(password);

    return db
    .insert(users)
    .values({name, email, passwordHash, createdAt: new Date()})
    .returning()
    .get();
}