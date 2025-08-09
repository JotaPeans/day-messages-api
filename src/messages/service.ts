import { db } from "@/lib/db";
import { MessageType, MessageWithUserSentType } from "./model";

interface GetMessagesProps {
  userToId: string;
  page: number;
  items?: number;
}

interface CreateMessagesProps {
  userFromId: string;
  userToId: string;
  message: string;
}

interface UpdateMessageProps {
  id: string;
  liked: boolean;
}

export abstract class MessagesService {
  static async getMessages({
    userToId,
    page,
    items = 10,
  }: GetMessagesProps): Promise<MessageWithUserSentType[]> {
    const messages = await db.message.findMany({
      where: {
        userToId,
      },
      include: {
        userSent: true
      },
      skip: (page - 1) * items,
      take: items,
      orderBy: {
        createdAt: "desc",
      },
    });

    return messages;
  }
  static async createMessage({
    message,
    userFromId,
    userToId,
  }: CreateMessagesProps): Promise<MessageType> {
    return await db.message.create({
      data: {
        userFromId,
        message,
        userToId,
      },
    });
  }
  static async updateMessage({
    id,
    liked,
  }: UpdateMessageProps): Promise<MessageType | null> {
    return db.message.update({
      where: {
        id,
      },
      data: {
        liked,
      },
    });
  }
}
