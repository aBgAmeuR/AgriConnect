import { z } from 'zod';

export const MessageSchema = z.object({
  id: z.string(),
  date: z.string(),
  content: z.string(),
  sender: z.string(),
  receiver: z.string(),
});

export const ConversationSchema = z.object({
  date: z.string(),
  receiver: z.string(),
  messages: z.array(MessageSchema),
});

export const MessagesSchema = z.array(MessageSchema);

export const ConversationsSchema = z.array(ConversationSchema);

export type Message = z.infer<typeof MessageSchema>;

export type Messages = z.infer<typeof MessagesSchema>;

export type Conversation = z.infer<typeof ConversationSchema>;

export type Conversations = z.infer<typeof ConversationsSchema>;
