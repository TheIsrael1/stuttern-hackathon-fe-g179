'use client';

import { cn, Button } from '@nextui-org/react';
import Image from 'next/image';
import { useState } from 'react';
import logo from '@/assets/svg/logo.svg';
import navToggler from '@/assets/svg/navToggler.svg';
import dynamic from 'next/dynamic';
const TopNavDrawer = dynamic(() => import('@/components/partials/top-nav-drawer'), { ssr: false });

const TopNav = () => {
  const [navOpen, setNavOpen] = useState(false);

  return (
    <nav className="w-full  px-container-base h-[2.5rem] md:hidden py-[1.75rem]  bg-black-2 sticky top-0 right-0 left-0">
      <TopNavDrawer navOpen={navOpen} setNavOpen={(i) => setNavOpen(i)} />
      <div className="w-full  h-full flex items-center justify-between">
        <div className="flex items-center gap-[0.75rem] cursor-pointer">
          <Image alt="" src={logo} />
          <h4
            className={cn(
              `text-[1.25rem] font-[700]  text-white transition-opacity duration-300  whitespace-nowrap `
            )}
          >
            LobeAI
          </h4>
        </div>
        <Button
          onClick={() => setNavOpen((prev) => !prev)}
          isIconOnly
          className={cn(
            ' bg-transparent  hover:bg-white/10 focus:outline-none transition-transform'
          )}
        >
          <Image alt="" src={navToggler} />
        </Button>
      </div>
    </nav>
  );
};

export default TopNav;
