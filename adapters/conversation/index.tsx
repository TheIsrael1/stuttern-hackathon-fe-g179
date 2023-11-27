import { IPromptConversationReq } from '@/types/api.types';
import { BASE_URL, myFetch, COMMON_HEADER, bearifyToken } from '..';
import { RequestParamsWithToken } from '../adapters.types';

const createConversation = async ({ token }: RequestParamsWithToken<null>) => {
  const res = await myFetch(`${BASE_URL}/create-conversation`, {
    headers: {
      ...COMMON_HEADER.headers,
      Authorization: bearifyToken(token)
    },
    method: 'POST'
  });
  const data = res.json();

  return data;
};

const getAllConversations = async ({ token }: RequestParamsWithToken<any>) => {
  const res = await myFetch(`${BASE_URL}/conversations`, {
    headers: {
      ...COMMON_HEADER.headers,
      Authorization: bearifyToken(token)
    },
    method: 'GET'
  });
  const data = res.json();

  return data;
};

const getConversation = async ({
  token,
  params
}: RequestParamsWithToken<{ conversation_id: string }>) => {
  const res = await myFetch(`${BASE_URL}/conversation?id=${params?.conversation_id}`, {
    headers: {
      ...COMMON_HEADER.headers,
      Authorization: bearifyToken(token)
    },
    method: 'GET'
  });
  const data = res.json();

  return data;
};

const promptConversation = async ({
  token,
  params
}: RequestParamsWithToken<IPromptConversationReq>) => {
  const res = await myFetch(`${BASE_URL}/create-prompt`, {
    headers: {
      ...COMMON_HEADER.headers,
      Authorization: bearifyToken(token)
    },
    method: 'POST',
    body: JSON.stringify({
      ...params
    })
  });
  const data = res.json();

  return data;
};

const conversationService = {
  createConversation,
  getAllConversations,
  getConversation,
  promptConversation
};

export default conversationService;
