import { Button } from '@nextui-org/react';
import Image from 'next/image';
import landingImgDemo from '@/assets/images/landing-demo-img-big.png';
import airbnb from '@/assets/svg/landing/airbnb.svg';
import edx from '@/assets/svg/landing/edx.svg';
import google from '@/assets/svg/landing/google.svg';
import expo from '@/assets/svg/landing/expo.svg';
import { BackGroundTint } from './landing.components';

export default function page() {
  return (
    <main className="w-full relative flex flex-col py-[10rem] gap-[6.89rem]">
      <section className="relative w-full flex flex-col md:items-center container px-container-base lg:px-container-lg">
        <h1 className="text-white text-[1.75rem] md:text-[2.5rem] font-[700] leading-[2.8125rem] md:leading-normal mb-[1.5rem] md:mb-[2rem] text-start md:text-center">
          Ask LobeAI anything about your database
        </h1>
        <p className="text-[1rem] md:text-[1.125rem] text-white leading-[1.5625rem] md:leading-normal mb-[3rem] md:mb-[2.9rem]">
          Transform natural language into powerful queries.
        </p>
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
          className="text-white bg-button-gradient-1 px-[1.5rem] py-[0.75rem] group w-max md:mx-auto"
        >
          Try LobeAI
        </Button>
      </section>
      <section className="w-full relative grid place-items-center px-container-base lg:px-container-lg">
        <BackGroundTint className={'absolute top-0 mx-auto hidden md:flex'} />
        <BackGroundTint className={'absolute right-0 top-1/2 hidden md:flex'} />
        <BackGroundTint className={'absolute top-1/2 left-0 hidden md:flex'} />
        <BackGroundTint className={'absolute bottom-0 mx-auto hidden md:flex'} />
        <div className="max-w-[66.75rem] z-[1]">
          <Image alt="" src={landingImgDemo} />
        </div>
      </section>
      <section className="container w-full  px-container-base lg:px-container-lg flex flex-col gap-[2.3rem] md:gap-[2rem]">
        <h5 className="font-metal text-[2rem] text-white text-center">Trusted by</h5>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-[2rem] md:gap-[5rem] max-w-[63.56rem] mx-auto">
          <Image alt="" src={airbnb} />
          <Image alt="" src={edx} />
          <Image alt="" src={google} />
          <Image alt="" src={expo} />
        </div>
      </section>
    </main>
  );
}
