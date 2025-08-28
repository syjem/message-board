import { connectToMongoDB } from "@/configs/db";
import { Message } from "@/models/message-schema";
import { NextResponse } from "next/server";

export const GET = async () => {
  await connectToMongoDB();

  const messages = await Message.find().sort({ _id: -1 }).limit(20);

  return NextResponse.json({ messages: messages });
};
