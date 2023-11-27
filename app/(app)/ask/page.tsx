import authService from '@/adapters/auth';
import conversationService from '@/adapters/conversation';
import databaseService from '@/adapters/database';
import AskChat from '@/components/ask-chat';
import { ResponseError } from '@/lib/error';
import { ApiInterface, conversationInterface, dbInterface } from '@/types/api.types';

export default async function page() {
  const tokenData = await authService.getToken();

  const databaseData: Promise<ApiInterface<dbInterface[]>> = databaseService.getDatabases({
    token: tokenData?.token?.token
  });

  const historyData: Promise<ApiInterface<conversationInterface[]>> =
    conversationService.getAllConversations({
      token: tokenData?.token?.token
    });

  let history: ApiInterface<conversationInterface[]> = { status: '', data: [] };
  let databases: ApiInterface<dbInterface[]> = { status: '', data: [] };

  Promise.all([databaseData, historyData])
    .then((res) => {
      databases = res[0];
      history = res[1];
    })
    .catch((err) => {
      console.log('error', err);
    });

  return (
    <main className="w-full h-full">
      <AskChat history={history} initDatabases={databases} token={tokenData?.token?.token} />
    </main>
  );
}
