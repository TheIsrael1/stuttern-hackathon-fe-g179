import React from 'react';
import logo from '@/assets/svg/logo.svg';
import Image from 'next/image';
import { landingNavData } from './landing-nav.data';
import Link from 'next/link';
import { Button } from '@nextui-org/react';
import dynamic from 'next/dynamic';
import Auth from '@/components/auth';
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
          <Auth className="hidden md:flex" />
          <LandingMenu />
        </div>
      </div>
    </nav>
  );
};

export default LandingNav;
