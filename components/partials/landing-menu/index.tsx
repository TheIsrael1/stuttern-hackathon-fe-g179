'use client';

import { Button, cn } from '@nextui-org/react';
import Image from 'next/image';
import { useState } from 'react';
import menuIcon from '@/assets/svg/menuIcon.svg';
import { createPortal } from 'react-dom';
import logo from '@/assets/svg/logo.svg';
import { landingNavData } from '../landing-nav/landing-nav.data';
import Link from 'next/link';

const LandingMenu = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <Button
        onClick={() => setMenuOpen((prev) => !prev)}
        isIconOnly
        className={cn('z-10 bg-transparent hover:bg-white/10 focus:outline-none lg:hidden')}
      >
        <Image src={menuIcon} alt="" />
      </Button>
      {createPortal(
        <div
          className={cn(
            'fixed w-screen h-screen top-0 bottom-0 right-0 left-0 transition-all ease-in-out duration-300 z-20',
            menuOpen ? `translate-x-0 opacity-100` : `translate-x-full opacity-0`
          )}
        >
          <div className="w-full h-full py-[3.69rem]  px-container-base flex flex-col  gap-[6rem] bg-black-1">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-[0.75rem]">
                <Image alt="" src={logo} />
                <h4 className="text-[1.25rem] font-[700] text-white">LobeAI</h4>
              </div>
              <Button
                onClick={() => setMenuOpen((prev) => !prev)}
                isIconOnly
                className={cn('z-10  bg-transparent hover:bg-white/10 focus:outline-none')}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6 text-white"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </Button>
            </div>
            <ul className="flex flex-col items-center gap-[1.5rem]">
              {landingNavData?.map((i, idx) => (
                <li key={idx}>
                  <Link
                    className="font-[500] font-jakarta  text-[1.5rem] text-white hover:text-green-1 transition-colors ease-in-out duration-300"
                    href={`${i?.link}`}
                  >
                    {i?.title}
                  </Link>
                </li>
              ))}
            </ul>
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
              className="text-white bg-button-gradient-1 px-[1.5rem] py-[0.75rem] group w-max mx-auto"
            >
              Try LobeAI
            </Button>
          </div>
        </div>,
        document.body
      )}
    </>
  );
};

export default LandingMenu;
