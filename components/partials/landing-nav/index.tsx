import React from 'react';
import logo from '@/assets/svg/logo.svg';
import Image from 'next/image';
import { landingNavData } from './landing-nav.data';
import Link from 'next/link';
import { Button } from '@nextui-org/react';
import dynamic from 'next/dynamic';
const LandingMenu = dynamic(() => import('@/components/partials/landing-menu'), { ssr: false });

const LandingNav = () => {
  return (
    <nav className="w-full container sticky top-0 right-0 left-0  px-container-base lg:px-container-lg backdrop-blur-sm z-10">
      <div className="w-full flex justify-between py-4">
        <div className="flex items-center gap-[0.75rem]">
          <Image alt="" src={logo} />
          <h4 className="text-[1.25rem] md:text-[1.5rem] font-[700] text-white">LobeAI</h4>
        </div>
        <ul className="hidden lg:flex items-center gap-[2.19rem]">
          {landingNavData?.map((i, idx) => (
            <li key={idx}>
              <Link
                className="font-[500] text-4 text-white hover:text-green-1 transition-colors ease-in-out duration-300"
                href={`${i?.link}`}
              >
                {i?.title}
              </Link>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-[0.75rem]">
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
            className="text-white bg-button-gradient-1 px-[1.5rem] py-[0.75rem] group hidden md:flex"
          >
            Try LobeAI
          </Button>
          <LandingMenu />
        </div>
      </div>
    </nav>
  );
};

export default LandingNav;
