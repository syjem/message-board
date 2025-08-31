import { getMessages } from "@/data/messages";
import { NextResponse } from "next/server";

export const GET = async () => {
  const messages = await getMessages();

  return NextResponse.json({ messages: JSON.parse(JSON.stringify(messages)) });
};
