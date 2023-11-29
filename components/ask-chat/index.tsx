'use client';

import React, { useEffect, useRef, useState } from 'react';
import HistoryTab from '../partials/history-tab';
import { Button, cn } from '@nextui-org/react';
import Image from 'next/image';
import Kite from '@/assets/svg/kite.svg';
import { User } from '@nextui-org/react';
import { ScrollShadow } from '@nextui-org/react';
import { generateAvatarPlaceholderLink } from '@/lib';
import { useSession } from 'next-auth/react';
import TextAnim from '../animation/text-anime';
import useAuthStore from '@/store/useAuthStore';
import databaseService from '@/adapters/database';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  ApiInterface,
  IPromptConversationReq,
  conversationInterface,
  dbInterface
} from '@/types/api.types';
import dynamic from 'next/dynamic';
import conversationService from '@/adapters/conversation';
import toast from 'react-hot-toast';
const DbToggler = dynamic(() => import('@/components/db-toggler'), { ssr: false });
import logo from '@/assets/svg/logo.svg';
import ReactLoading from 'react-loading';
import { Skeleton } from '@nextui-org/react';
import { useSearchParams } from 'next/navigation';

interface IAskChat {
  token: string;
  initDatabases: ApiInterface<dbInterface[]>;
  history: ApiInterface<conversationInterface[]>;
}

const AskChat = ({ history, initDatabases, token }: IAskChat) => {
  const queryClient = useQueryClient();
  const { data: user } = useSession();
  const { activeDb, setActiveDb } = useAuthStore((store) => store);
  const [propmt, setPrompt] = useState(``);
  const [currConversationId, setCurrConversationId] = useState(``);

  const searchParams = useSearchParams();

  const isDemo = searchParams.get('isDemo');

  const chatBlockBaseRef = useRef<HTMLDivElement | null>(null);

  const { data: databases, isLoading } = useQuery<any, any, ApiInterface<dbInterface[]>>({
    queryKey: ['get-Databases'],
    queryFn: () =>
      databaseService.getDatabases({
        token
      }),
    initialData: initDatabases
  });

  const { data: conversation, isLoading: conversationLoading } = useQuery<
    ApiInterface<conversationInterface>
  >({
    queryKey: ['get-single-conversation', currConversationId],
    queryFn: () =>
      conversationService.getConversation({
        token,
        params: {
          conversation_id: currConversationId
        }
      }),
    enabled: currConversationId?.length ? true : false
  });

  const {
    mutate: createPrompt,
    isPending: promtCreationLoading,
    variables
  } = useMutation<any, any, IPromptConversationReq>({
    mutationFn: (params) =>
      conversationService.promptConversation({
        token,
        params
      }),
    onError: (err) => {
      toast.error(`${err}`);
    },
    onMutate: () => {
      setPrompt(``);
    },
    onSettled: async () => {
      return await queryClient.invalidateQueries({
        queryKey: ['get-single-conversation', currConversationId]
      });
    }
  });

  const { mutate: createConversation, isPending: conversationCreationLoading } = useMutation<
    ApiInterface<conversationInterface>
  >({
    mutationFn: () =>
      conversationService.createConversation({
        token
      }),
    onSuccess: (data) => {
      setCurrConversationId(data?.data?.id);
      if (propmt.length) {
        createPrompt({
          conversation_id: data?.data?.id,
          database_id: activeDb,
          query: propmt
        });
      }
      queryClient.refetchQueries({
        queryKey: ['get-all-conversation']
      });
    },
    onError: (err) => {
      toast.error(`${err}`);
    }
  });

  const handleSendPropmt = () => {
    if (!propmt.length) {
      toast.error('Please enter a question in the input box below');
      return;
    }
    if (!activeDb.length) {
      toast.error(`Please make sure you have created and selected a database!`);
      return;
    }

    if (!currConversationId.length) {
      createConversation();
    } else {
      createPrompt({
        conversation_id: currConversationId,
        database_id: activeDb,
        query: propmt
      });
    }
  };

  const createNewConversation = () => {
    createConversation();
  };

  useEffect(() => {
    chatBlockBaseRef?.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'end'
    });
  }, [conversation, currConversationId, promtCreationLoading]);

  useEffect(() => {
    if (isDemo === 'true') {
      setActiveDb(databases?.data[0]?.id);
      setCurrConversationId(history?.data?.[history?.data?.length - 1]?.id);
    }
  }, [isDemo]);

  return (
    <div className="w-full h-full flex">
      {conversationLoading ? (
        <div className="flex-grow w-full grid place-items-center container px-container-base relative">
          <ReactLoading color="#ffffff" type="spin" />
        </div>
      ) : (
        <div className="flex-grow w-full container px-container-base relative">
          <div className="absolute top-[1.87rem] right-[1.31rem]">
            <DbToggler databases={databases?.data} />
          </div>
          {conversation?.data?.prompts?.length || promtCreationLoading ? (
            <div className="w-full h-full flex flex-col pt-[5rem] pb-[2rem] ">
              <ScrollShadow
                hideScrollBar
                className="flex-grow overflow-auto flex flex-col gap-[2rem] md:gap-[3.3rem] mb-[2.3rem]"
              >
                {conversation?.data?.prompts?.map((i, idx) => (
                  <div key={idx} className="flex flex-col gap-[2rem]">
                    <div className="flex items-center justify-end gap-[1rem] ">
                      <MyQuestion comment={i?.query} />
                      <User
                        name=""
                        avatarProps={{
                          src:
                            user?.user?.image ??
                            generateAvatarPlaceholderLink({
                              name: user?.user?.name ?? `anon`
                            })
                        }}
                        className="hidden md:flex"
                      />
                    </div>
                    <div className="flex justify-start items-center gap-[1rem]">
                      <div className="grid place-items-center w-[40px] h-[40px] bg-white rounded-[50px] p-2">
                        <Image alt="" src={logo} />
                      </div>
                      <AskChat.Answer
                        response={i?.response}
                        typewrite={
                          conversation.data.prompts?.length === idx + 1 && !promtCreationLoading
                        }
                      />
                    </div>
                  </div>
                ))}
                {promtCreationLoading ? (
                  <div className="flex flex-col gap-[2rem]">
                    <div className="flex items-center justify-end gap-[1rem] ">
                      <MyQuestion comment={`${variables?.query}`} />
                      <User
                        name=""
                        avatarProps={{
                          src:
                            user?.user?.image ??
                            generateAvatarPlaceholderLink({
                              name: user?.user?.name ?? `anon`
                            })
                        }}
                        className="hidden md:flex"
                      />
                    </div>
                    <div className="flex justify-start items-center gap-[1rem] w-full">
                      <div className="grid place-items-center w-[40px] h-[40px] bg-white rounded-[50px] p-2">
                        <Image alt="" src={logo} />
                      </div>
                      <AskChat.Answer response={`Generating Response...`} typewrite={true} />
                    </div>
                  </div>
                ) : (
                  <></>
                )}
                <div ref={chatBlockBaseRef}></div>
              </ScrollShadow>
              <div className="w-full flex items-center gap-[0.75rem]">
                <User
                  name=""
                  avatarProps={{
                    src:
                      user?.user?.image ??
                      generateAvatarPlaceholderLink({
                        name: user?.user?.name ?? `anon`
                      })
                  }}
                  className="hidden md:flex"
                />
                <AskChat.Input
                  disabled={promtCreationLoading}
                  onRightBtnClick={() => handleSendPropmt()}
                  value={propmt}
                  onChange={(e) => setPrompt(e?.target?.value)}
                />
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
                    src:
                      user?.user?.image ??
                      generateAvatarPlaceholderLink({
                        name: user?.user?.name ?? `anon`
                      })
                  }}
                  className="hidden md:flex"
                />
                <AskChat.Input
                  disabled={promtCreationLoading}
                  onRightBtnClick={() => handleSendPropmt()}
                  value={propmt}
                  onChange={(e) => setPrompt(e?.target?.value)}
                />
              </div>
            </div>
          )}
        </div>
      )}
      <aside className="hidden lg:block h-full w-max z-[1]">
        <HistoryTab
          token={token}
          history={history}
          createConversation={() => createNewConversation()}
          setCurrConverstion={(i) => {
            setCurrConversationId(i);
          }}
        />
      </aside>
    </div>
  );
};

export default AskChat;

interface InputInterface extends React.InputHTMLAttributes<HTMLInputElement> {
  wrapperClassName?: string;
  onRightBtnClick?: () => void;
  rightBtnClickDisabled?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputInterface>(
  ({ wrapperClassName, onRightBtnClick, rightBtnClickDisabled, ...props }, ref) => {
    return (
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onRightBtnClick?.();
        }}
        className={cn(
          'w-full flex items-center h-[3rem] rounded-[1rem] border border-gray-4 pl-8 pr-[8px]'
        )}
      >
        <input
          ref={ref}
          {...props}
          className="flex-grow  bg-transparent focus:outline-none focus:border-none text-white"
        />
        <Button
          disabled={rightBtnClickDisabled}
          radius="sm"
          isIconOnly
          className="bg-transparent hover:bg-white/10 focus:outline-none"
          type="submit"
        >
          <Image src={Kite} alt="" />
        </Button>
      </form>
    );
  }
);
AskChat.Input = Input;

Input.displayName = 'AskChatInput';

const MyQuestion = ({ comment, className }: { comment: string; className?: string }) => {
  return (
    <div
      className={cn(
        'w-full py-[0.88rem] px-[1rem] rounded-[0.5rem] bg-green-1 text-[0.875rem] md:text-[1rem] font-[500] max-w-[35.875rem] text-white',
        className
      )}
    >
      <span>{comment}</span>
    </div>
  );
};

AskChat.MyComment = MyQuestion;

MyQuestion.displayname = 'AskChatQuestion';

const Answer = ({
  response,
  typewrite,
  className
}: {
  response: any;
  className?: string;
  typewrite: boolean;
}) => {
  return (
    <div
      className={cn(
        'w-full px-[1rem] text-[0.875rem] md:text-[1rem] font-[500] text-white',
        className
      )}
    >
      {!typewrite ? (
        <span dangerouslySetInnerHTML={{ __html: response }} />
      ) : (
        <TextAnim html={response} />
      )}
    </div>
  );
};

AskChat.Answer = Answer;

Answer.displayname = 'AskChatAnswer';
