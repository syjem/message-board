import { connectToMongoDB } from "@/configs/db";
import { Message } from "@/models/message-schema";

export const getMessages = async () => {
  await connectToMongoDB();
  const messages = await Message.find();

  return JSON.parse(JSON.stringify(messages));
};
