import { v4 as uuid } from "uuid";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { connectToMongoDB } from "@/configs/db";
import { Session } from "@/models/session-schema";

export const POST = async (req: Request) => {
  await connectToMongoDB();
  const cookieStore = await cookies();

  const { username } = await req.json();
  const sessionId = `session:${uuid()}`;
  const expiration = new Date(Date.now() + 1000 * 60 * 60 * 24 * 30);

  await Session.create({ username, sessionId, expiration });

  cookieStore.set("session_id", sessionId, {
    httpOnly: true,
    secure: true,
    maxAge: 60 * 60 * 24 * 30,
    path: "/",
  });

  return NextResponse.json({ success: true });
};
