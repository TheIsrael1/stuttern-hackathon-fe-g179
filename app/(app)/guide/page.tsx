import Image from 'next/image';
import guideVideoPlaceholder from '@/assets/images/guideVideoPh.png';
import { Button } from '@nextui-org/react';
import Link from 'next/link';
import authService from '@/adapters/auth';

export default async function page() {
  const data = await authService.getToken();

  return (
    <main className="w-full container px-container-base py-[3.38rem] flex flex-col gap-[2rem] md:gap-[4.06rem]">
      <div className="flex flex-col gap-[1.5rem] md:gap-[3.19rem]">
        <span className="text-4 md:text-[1.25rem] font-[700] text-white text-center">
          Welcome {`${data?.token?.name}`}!
        </span>
        <div className="flex flex-col gap-[1rem] md:gap-[1.5rem]">
          <h2 className="text-[1.5rem] md:text-[2rem] font-[700] text-center text-white">
            Unlock the power of your data effortlessly
          </h2>
          <p className="leading-tight text-center text-white text-[0.875rem] md:text-4">
            Simply ask or build queries with our intuitive interface to delve into your e-commerce
            database.
          </p>
        </div>
      </div>
      <div className="w-full flex flex-col gap-4 md:gap-[1.6rem] max-w-[38.625rem] mx-auto">
        {(
          [
            {
              title: `Connect to Your Database`,
              steps: [
                'Connect to your e-commerce database with a single click',
                'Verify your successful connection, ensuring a secure and instant link to your data for real-time interactions.'
              ]
            },
            {
              title: `Start Querying Instantly`,
              steps: [
                'With a secure connection established, dive into your data by simply typing your questions in plain language',
                'Experience the magic as our system instantly translates your queries into powerful SQL, providing immediate insights from your e-commerce database'
              ]
            }
          ] as { title: string; steps: string[] }[]
        )?.map((i, idx) => (
          <div key={idx} className="flex flex-col gap-[1.6rem]">
            <div className="flex items-center gap-[1.6rem]">
              <div className="w-[1.75rem] h-[1.75rem] bg-green-1 rounded-[50px] grid place-items-center ">
                <span className="font-jakarta font-[700] text-white">{idx + 1}</span>
              </div>
              <span className="font-[600] text-white">{i?.title}</span>
            </div>
            <div className="flex gap-[1.6rem] h-max">
              <div className="min-w-[28px] h-full flex justify-center">
                <div className="h-full rounded-[3.125rem] w-[0.125rem] bg-green-1" />
              </div>
              <ul className="list-disc pl-[1.6rem]">
                {i?.steps?.map((i, idx) => (
                  <li key={idx} className="text-white text-[0.875rem] leading-[1.5625rem]">
                    {i}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
      <div className="flex flex-col gap-[3.69rem]  items-center">
        <Image className="w-[27.9375rem] h-[15rem]" src={guideVideoPlaceholder} alt="" />
        <div className="w-full flex items-center justify-center gap-4">
          <Link href={`/database`}>
            <Button
              radius="full"
              endContent={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6 text-white group-hover:translate-x-1 transition-transform ease-in-out duration-300"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                  />
                </svg>
              }
              className="text-white bg-button-gradient-1 px-[1.5rem] py-[0.75rem] group"
            >
              Get Started
            </Button>
          </Link>
          <Link href={`/ask`}>
            <Button
              radius="full"
              endContent={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6 text-white group-hover:translate-x-1 transition-transform ease-in-out duration-300"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                  />
                </svg>
              }
              className="text-white bg-transparent border border-green-1 px-[1.5rem] py-[0.75rem] group"
            >
              Try Demo
            </Button>
          </Link>
        </div>
      </div>
    </main>
  );
}
