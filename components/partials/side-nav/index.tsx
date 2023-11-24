'use client';

import { Button, cn } from '@nextui-org/react';
import React, { useState } from 'react';
import Image from 'next/image';
import logo from '@/assets/svg/logo.svg';
import navToggler from '@/assets/svg/navToggler.svg';
import AskIcon from '@/assets/svg/AskIcon';
import DbIcon from '@/assets/svg/dbIcon';
import SettingsIcon from '@/assets/svg/settingsIcon';
import GuideIcon from '@/assets/svg/guideIcon';
import { User } from '@nextui-org/react';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import { generateAvatarPlaceholderLink } from '@/lib';

interface INavLinks {
  title: string;
  link: string;
  icon: JSX.Element;
}

const navLinks: INavLinks[] = [
  { title: `Ask`, icon: <AskIcon />, link: `/ask` },
  { title: `Database`, icon: <DbIcon />, link: `/database` },
  { title: `Settings`, icon: <SettingsIcon />, link: `/settings` },
  { title: `User Guide`, icon: <GuideIcon />, link: `/guide` }
];

interface ISideNav {
  onNavAction?: () => void;
}

const SideNav = ({ onNavAction }: ISideNav) => {
  const [navOpen, setNavOpen] = useState(true);
  const pathname = usePathname();

  return (
    <div
      className={cn(
        `sticky top-0 bottom-0  bg-black-2 ${
          navOpen ? `w-full md:w-[14.8rem]` : `w-full md:w-[5.5rem]`
        } h-full py-[1.75rem] relative  flex flex-col  transition-[width] duration-300 ease-in-out z-[100]`
      )}
    >
      <div className={cn('w-full flex items-center justify-between px-[1.5rem] h-[38px] ')}>
        <div className="flex items-center gap-[0.75rem] cursor-pointer">
          <Image alt="" src={logo} />
          <h4
            className={cn(
              `text-[1.5rem] font-[700]  text-white transition-opacity duration-300  whitespace-nowrap `,
              navOpen ? `opacity-100` : `md:scale-0 md:opacity-5`
            )}
          >
            LobeAI
          </h4>
        </div>
        <Button
          onClick={() => setNavOpen((prev) => !prev)}
          isIconOnly
          className={cn(
            'z-10  bg-transparent absolute -right-[15px] hidden   hover:bg-white/10 focus:outline-none transition-transform',
            navOpen ? `hidden` : `md:flex`
          )}
        >
          <Image alt="" src={navToggler} />
        </Button>
        <Button
          onClick={() => {
            setNavOpen((prev) => !prev);
            onNavAction?.();
          }}
          isIconOnly
          className={cn(
            'z-10  bg-transparent relative md:hidden hover:bg-white/10 focus:outline-none transition-transform',
            !navOpen ? `md:hidden` : `md:flex`
          )}
        >
          <Image alt="" src={navToggler} />
        </Button>
      </div>
      <div className="flex-grow pt-[5.75rem] flex flex-col gap-[1.75rem] overflow-hidden">
        {navLinks?.map((i, idx) => (
          <Link
            onClick={() => onNavAction?.()}
            href={i?.link}
            key={idx}
            className={cn('w-full relative bg-inherit group pl-[1rem] h-[2.75rem] cursor-pointer ')}
          >
            <div
              className={cn(
                `w-full absolute top-0 h-full bg-white rounded-tl-[0.25rem] rounded-bl-[0.25rem] z-[1]  
              transition-transform ease-in-out duration-200`,
                pathname === `${i?.link}`
                  ? `translate-x-0`
                  : `translate-x-full group-hover:translate-x-0`
              )}
            ></div>
            <button
              className={cn(
                `w-full h-full relative  min-w-[2.75rem] px-4 
                 cursor-pointer transition-colors ease-in-out duration-300 z-[2] bg-transparent `,
                `flex items-center gap-[0.75rem]`,
                pathname === `${i?.link}` ? `text-black-2` : `text-white group-hover:text-black-2`
              )}
            >
              <span className="">{i?.icon}</span>
              <span
                className={cn(
                  'text-[0.875rem] font-[600] transition-opacity duration-300 whitespace-nowrap',
                  navOpen ? `opacity-100` : `md:scale-0 md:opacity-5`
                )}
              >
                {i?.title}
              </span>
            </button>
          </Link>
        ))}
      </div>
      <div className="w-full px-[1.5rem]">
        <User
          name="Jane Doe"
          description="Product Designer"
          avatarProps={{
            src: generateAvatarPlaceholderLink({
              name: `Jane Doe`
            })
          }}
          classNames={{
            name: cn(
              ` text-[1rem] font-[600] !text-white transition-opacity duration-300 whitespace-nowrap`,
              navOpen ? `opacity-100` : `md:scale-0 md:opacity-5`
            ),
            description: cn(
              `!text-gray-1 !font-[500] !text-[0.875rem] transition-opacity duration-300 whitespace-nowrap`,
              navOpen ? `opacity-100` : `md:scale-0 md:opacity-5`
            ),
            base: ``
          }}
        />
      </div>
    </div>
  );
};

export default SideNav;
