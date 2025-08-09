import { Message as MessageSchema, User as UserSchema } from "@/generated/prisma";

export type MessageType = MessageSchema 

export interface MessageWithUserSentType extends MessageSchema {
  userSent: UserSchema | null;
}
