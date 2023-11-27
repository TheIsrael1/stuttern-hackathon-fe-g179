import { dbTypeEnums } from '@/models';
import { z } from 'zod';

export interface ApiInterface<T> {
  status: string;
  data: T;
}

export interface userDetailsInterface {}

export type dbTypeTypes = z.infer<typeof dbTypeEnums>;

export interface dbInterface {
  id: string;
  uri: string;
  type?: dbTypeTypes;
  username?: string;
  password?: string;
  host?: string;
  port?: string;
  user_id?: string;
  user?: any;
  created_at?: string;
  updated_at?: string;
}

export interface conversationInterface {
  id: string;
  prompts: null | propmtInterface[];
  user: any;
  user_id: string;
  created_at: string;
  updated_at: string;
}

export interface propmtInterface {
  id: string;
  query: string;
  response: string;
  conversation: any;
  conversation_id: string;
  created_at: string;
  updated_at: string;
}

export interface IPromptConversationReq {
  query: string;
  database_id: string;
  conversation_id: string;
}
