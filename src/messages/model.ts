import { Message as MessageSchema, User as UserSchema } from "@prisma/client";

export type MessageType = MessageSchema 

export interface MessageWithUserSentType extends MessageSchema {
  userSent: UserSchema | null;
}
