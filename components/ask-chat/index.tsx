'use client';

import React, { useState } from 'react';
import HistoryTab from '../partials/history-tab';
import { Button, cn } from '@nextui-org/react';
import Image from 'next/image';
import Kite from '@/assets/svg/kite.svg';
import { User } from '@nextui-org/react';
import { ScrollShadow } from '@nextui-org/react';
import { generateAvatarPlaceholderLink } from '@/lib';

const AskChat = () => {
  const [chatIsLive, setChatIsLive] = useState(true);
  const [propmt, setPrompt] = useState(``);

  return (
    <div className="w-full h-full flex ">
      <div className="flex-grow w-full container px-container-base">
        {chatIsLive ? (
          <div className="w-full h-full flex flex-col py-[4rem] ">
            <ScrollShadow hideScrollBar className="flex-grow overflow-auto flex-col mb-[2.3rem]">
              <div></div>
            </ScrollShadow>
            <div className="w-full flex items-center gap-[0.75rem]">
              <User
                name=""
                avatarProps={{
                  src: generateAvatarPlaceholderLink({
                    name: `Ehindero Israel`
                  })
                }}
                className="hidden md:flex"
              />
              <AskChat.Input value={propmt} onChange={(e) => setPrompt(e?.target?.value)} />
            </div>{' '}
          </div>
        ) : (
          <div className="w-full  max-w-[47rem] mx-auto py-[6rem] md:py-[12.75rem] flex flex-col gap-[4rem] md:gap-[7.25rem]">
            <div className="flex flex-col gap-[1.5rem]">
              <h2 className="text-[1.5rem] md:text-[2rem] font-[700] text-center text-white">
                Ask LobeAI anything about your database
              </h2>
              <span className="text-white text-center">
                Transform natural language into powerful queries.
              </span>
            </div>
            <div className="w-full flex items-center gap-[0.75rem]">
              <User
                name=""
                avatarProps={{
                  src: 'https://i.pravatar.cc/150?u=a04258114e29026702d'
                }}
                className="hidden md:flex"
              />
              <AskChat.Input value={propmt} onChange={(e) => setPrompt(e?.target?.value)} />
            </div>
          </div>
        )}
      </div>
      <aside className="hidden lg:block h-full w-max z-[1]">
        <HistoryTab />
      </aside>
    </div>
  );
};

export default AskChat;

interface InputInterface extends React.InputHTMLAttributes<HTMLInputElement> {
  wrapperClassName?: string;
  onRightBtnClick?: () => void;
}

const Input = React.forwardRef<HTMLInputElement, InputInterface>(
  ({ wrapperClassName, onRightBtnClick, ...props }, ref) => {
    return (
      <div
        className={cn(
          'w-full flex items-center h-[3rem] rounded-[1rem] border border-gray-4 pl-8 pr-[4px]'
        )}
      >
        <input
          ref={ref}
          {...props}
          className="flex-grow  bg-transparent focus:outline-none focus:border-none text-white"
        />
        <Button
          radius="sm"
          isIconOnly
          className="bg-transparent hover:bg-white/10 focus:outline-none"
        >
          <Image src={Kite} alt="" />
        </Button>
      </div>
    );
  }
);
AskChat.Input = Input;

Input.displayName = 'AskChatInput';
