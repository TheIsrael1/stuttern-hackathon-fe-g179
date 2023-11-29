import { Button, cn } from '@nextui-org/react';
import Image from 'next/image';
import React from 'react';
import binImg from '@/assets/svg/binIcon.svg';
import chatIcon from '@/assets/svg/chatIcon.svg';
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownSection,
  DropdownItem
} from '@nextui-org/react';
import { useQuery } from '@tanstack/react-query';
import conversationService from '@/adapters/conversation';
import { ApiInterface, conversationInterface } from '@/types/api.types';
import ReactLoading from 'react-loading';
import { truncateString } from '@/lib';
import toast from 'react-hot-toast';

interface IHistoryTab {
  history: ApiInterface<conversationInterface[]>;
  setCurrConverstion: (i: string) => void;
  createConversation: () => void;
  token: string;
}

const HistoryTab = ({ createConversation, history, setCurrConverstion, token }: IHistoryTab) => {
  const { data, isLoading } = useQuery<any, any, ApiInterface<conversationInterface[]>>({
    queryKey: ['get-all-conversation'],
    queryFn: () =>
      conversationService.getAllConversations({
        token
      }),
    initialData: history
  });

  return (
    <div
      className={cn(
        'sticky top-0 bottom-0  border-l border-l-black-3 w-full lg:w-[17.5rem] h-full bg-black-1 py-[2.19rem] px-[1.41rem]',
        'relative flex flex-col gap-[3.75rem]'
      )}
    >
      <div className="w-full flex items-center justify-between ">
        <h4 className="text-4 md:text-[1.25rem] text-white font-[600]">History</h4>
        <Button
          onClick={() => toast.success(`You cannot delete yet! This feature is coming soon!`)}
          isIconOnly
          className={cn('z-10  bg-transparent hover:bg-white/10 focus:outline-none')}
        >
          <Image src={binImg} alt="" />
        </Button>
      </div>
      {isLoading ? (
        <div className="w-full flex justify-center items-center">
          <ReactLoading type="spin" color="#ffffff" />
        </div>
      ) : (
        <div className="w-full flex flex-col gap-[1.5rem] max-h-max overflow-auto">
          {data?.data?.map((i, idx) => (
            <div
              key={idx}
              className="flex items-center gap-[0.75rem] px-[0.75rem] py-[0.62rem] hover:bg-white/10 rounded-[0.5rem] transition-colors ease-in-out duration-300 cursor-pointer"
            >
              <div className="flex-grow flex items-center gap-[0.5rem]">
                <Image alt="" src={chatIcon} />
                <span className="text-white font-[500] whitespace-nowrap truncate ...">
                  {i?.prompts?.length
                    ? truncateString(i?.prompts[i?.prompts?.length - 1]?.query, 10)
                    : truncateString(i?.id, 10)}
                </span>
              </div>
              <Dropdown className="dark">
                <DropdownTrigger>
                  <Button
                    isIconOnly
                    className="bg-transparent hover:bg-white/10 group focus:outline-none"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6 text-gray-3 group-hover:text-white transition-colors ease-in-out duration-300"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                      />
                    </svg>
                  </Button>
                </DropdownTrigger>
                <DropdownMenu aria-label="Static Actions">
                  <DropdownItem
                    onClick={() => setCurrConverstion(i?.id)}
                    key="new"
                    className="text-white"
                  >
                    Open
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </div>
          ))}
        </div>
      )}
      <Button
        onClick={() => createConversation()}
        startContent={
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" />
          </svg>
        }
        className="bg-white  focus:outline-none font-[600] font-jakarta py-[0.75rem] text-4"
        radius="full"
      >
        New Conversation
      </Button>
    </div>
  );
};

export default HistoryTab;
