import { connectToMongoDB } from "@/configs/db";
import { Message } from "@/models/message-schema";

export const getMessages = async () => {
  await connectToMongoDB();
  const messages = await Message.find().sort({ _id: -1 }).limit(20);

  return JSON.parse(JSON.stringify(messages));
};
