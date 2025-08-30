import { NextResponse } from "next/server";
import { connectToMongoDB } from "@/configs/db";
import { Message } from "@/models/message-schema";

export const GET = async () => {
  await connectToMongoDB();
  const messages = await Message.find();

  return NextResponse.json({ messages: JSON.parse(JSON.stringify(messages)) });
};
