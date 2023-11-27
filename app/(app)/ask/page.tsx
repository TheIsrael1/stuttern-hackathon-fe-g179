import authService from '@/adapters/auth';
import conversationService from '@/adapters/conversation';
import databaseService from '@/adapters/database';
import AskChat from '@/components/ask-chat';
import { ApiInterface, conversationInterface, dbInterface } from '@/types/api.types';

export default async function page() {
  const tokenData = await authService.getToken();

  const [databaseData, historyData] = await Promise.all([
    databaseService.getDatabases({
      token: tokenData?.token?.token
    }),
    conversationService.getAllConversations({
      token: tokenData?.token?.token
    })
  ]);

  const databases: ApiInterface<dbInterface[]> = databaseData;
  const history: ApiInterface<conversationInterface[]> = historyData;

  return (
    <main className="w-full h-full">
      <AskChat history={history} initDatabases={databases} token={tokenData?.token?.token} />
    </main>
  );
}
