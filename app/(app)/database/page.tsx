import authService from '@/adapters/auth';
import DbConnection from '@/components/db-connection';
import { redirect } from 'next/navigation';

export default async function page() {
  let token = '';

  try {
    const data = await authService.getToken();
    token = data?.token?.token;
  } catch (err) {
    console.log('An error occurred', err);
    // redirect(`/error`);
  }

  return (
    <main className="w-full container px-container-base flex flex-col py-[4rem] md:py-[7.6rem] max-w-[56.9rem] mx-auto">
      <h3 className="text-[1.5rem] md:text-[2rem] font-[700] text-white mb-[3rem] md:mb-[4.88rem]">
        Connect your database
      </h3>
      <DbConnection token={token} />
      <p className="font-[500] leading-[1.5625rem] text-center max-w-[40.25rem] mx-auto text-white">
        We are working on expanding our database connections, opening new avenues for seamless
        integration and endless possibilities. Stay tuned for the next wave of connectivity!
      </p>
    </main>
  );
}
