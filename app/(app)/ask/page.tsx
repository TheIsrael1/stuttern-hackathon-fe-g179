import authService from '@/adapters/auth';
import conversationService from '@/adapters/conversation';
import databaseService from '@/adapters/database';
import AskChat from '@/components/ask-chat';
import { ApiInterface, conversationInterface, dbInterface } from '@/types/api.types';
import { redirect } from 'next/navigation';

export default async function page() {
  const tokenData = await authService.getToken();
  // let databases: ApiInterface<dbInterface[]> = { data: [], status: '' };
  // let history: ApiInterface<conversationInterface[]> = { data: [], status: '' };

  // try {
  //   const [databaseData, historyData] = await Promise.all([
  //     databaseService.getDatabases({
  //       token: tokenData?.token?.token
  //     }),
  //     conversationService.getAllConversations({
  //       token: tokenData?.token?.token
  //     })
  //   ]);

  //   databases = databaseData;
  //   history = historyData;
  // } catch (err) {
  //   console.log('An error occurred', err);
  //   redirect('/error');
  // }

  return (
    <main className="w-full h-full">
      <AskChat
        // history={history}
        // initDatabases={databases}
        token={tokenData?.token?.token}
      />
    </main>
  );
}
