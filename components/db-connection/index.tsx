'use client';

import React, { useEffect, useState } from 'react';
// import Boop from '@/components/animation/Boop';

import Image from 'next/image';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button
} from '@nextui-org/react';
import { ApiInterface, dbInterface, dbTypeTypes } from '@/types/api.types';
import { dbConnectActionLabels, dbImages } from './db-connection.data';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { dbConnectionSchema, dbConnectionSchemaInterface } from './db-connection.model';
import { Input } from '@nextui-org/react';
import { useMutation, useQuery } from '@tanstack/react-query';
import databaseService from '@/adapters/database';
import toast from 'react-hot-toast';
import connectionSuccessSvg from '@/assets/svg/database/celebration.svg';
import testingConnection from '@/assets/svg/database/testing.svg';
import Link from 'next/link';
import useAuthStore from '@/store/useAuthStore';
import { useRouter } from 'next/navigation';

interface IDbConnection {
  token: string;
}

const DbConnection = ({ token }: IDbConnection) => {
  const [selectedDb, setSelectedDb] = useState<dbTypeTypes>('mongodb');
  const [connectModalOpen, setConnectModalOpen] = useState(false);
  const { setActiveDb } = useAuthStore((store) => store);

  const router = useRouter();

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset
  } = useForm<dbConnectionSchemaInterface>({
    resolver: zodResolver(dbConnectionSchema),
    mode: 'all'
  });

  const { mutate, isPending, isSuccess, data } = useMutation<
    ApiInterface<dbInterface>,
    any,
    dbConnectionSchemaInterface
  >({
    mutationFn: (data) =>
      databaseService.createDatabase({
        params: data,
        token
      }),
    onError: (err) => {
      toast.error(`${err}`);
    }
  });

  const handleOpenDbConnection = (type: dbTypeTypes) => {
    setSelectedDb(type);
    setConnectModalOpen(true);
  };

  const onSubmit: SubmitHandler<dbConnectionSchemaInterface> = (data) => {
    mutate(data);
  };

  const handelStartAsking = () => {
    setActiveDb(data?.data?.id!);
    router.push(`/ask`);
  };

  useEffect(() => {
    reset({
      database_type: selectedDb
    });
  }, [selectedDb, reset]);

  return (
    <>
      <Modal
        classNames={{
          closeButton: isPending || isSuccess ? `!hidden` : ``,
          header: isPending || isSuccess ? `!hidden` : ``,
          footer: isPending || isSuccess ? `!hidden` : ``
        }}
        className="dark"
        isOpen={isPending || isSuccess ? true : connectModalOpen}
        onOpenChange={setConnectModalOpen}
      >
        <ModalContent as={'form'} onSubmit={handleSubmit(onSubmit)} className="!bg-black-1">
          <ModalHeader className="flex flex-col gap-1 w-[7.5rem] p-0 py-2 px-2">
            {dbImages[selectedDb]}
          </ModalHeader>
          {isPending ? (
            <ModalBody key={'pending'} className=" py-[3.5rem] flex flex-col gap-[1.5rem]">
              <div className="flex justify-center">
                <Image alt="" src={testingConnection} />
              </div>
              <h4 className="text-center font-jakarta text-white text-4 md:text-[1.125rem] font-[700]">
                Testing Connection...
              </h4>
              <p className="text-center  font-jakarta text-[0.875rem] text-gray-6">
                We're attempting to connect using the provided credentials. Please wait as we ensure
                a secure and successful connection to your database.
              </p>
            </ModalBody>
          ) : isSuccess ? (
            <ModalBody
              key={'success'}
              className=" py-[3.5rem] flex flex-col items-center gap-[1.5rem]"
            >
              <div className="flex justify-center">
                <Image alt="" src={connectionSuccessSvg} />
              </div>
              <h4 className="text-center font-jakarta text-white text-4 md:text-[1.125rem] font-[700]">
                Connection successful
              </h4>
              <p className="text-center  font-jakarta text-[0.875rem] text-gray-6">
                Your credentials are verified. Ready to proceed!
              </p>
              <Link href={`/ask`}>
                <Button
                  onClick={() => handelStartAsking()}
                  type="button"
                  color="danger"
                  className="rounded-[0.25rem] bg-button-gradient-1 px-4 py-[0.62rem] font-[600]"
                >
                  Start asking
                </Button>
              </Link>
            </ModalBody>
          ) : (
            <ModalBody
              key={'main'}
              className="border-t  border-b border-t-gray-5/10 border-b-gray-5/10 py-[2.5rem] flex flex-col gap-[2.56rem]"
            >
              <Input
                {...register('uri')}
                key={''}
                type="text"
                label="Connection String URI"
                labelPlacement={'outside'}
                description={'The connection string uri of your database'}
                placeholder="e.g mongodb://[username:password@]host[:port][,...hostN[:port]][/[database][?parameter_list]]"
                errorMessage={errors?.uri?.message}
                classNames={{
                  input: `placeholder:!text-[0.875rem] !text-[0.875rem] placeholder:font-inter`,
                  inputWrapper: `!h-[2.5rem] !bg-transparent !rounded-[0.5rem] !border !border-grey-4`,
                  errorMessage: ``,
                  description: `text-gray-6 font-[400] text-[0.875rem]`,
                  label: `!text-white font-[600]`
                }}
              />
              <Input
                {...register('database_name')}
                key={''}
                type="text"
                label="Database Name"
                labelPlacement={'outside'}
                description={'The name of the database you would like to query from your cluster'}
                placeholder="e.g users"
                errorMessage={errors?.database_name?.message}
                classNames={{
                  input: `placeholder:!text-[0.875rem] !text-[0.875rem] placeholder:font-inter`,
                  inputWrapper: `!h-[2.5rem] !bg-transparent !rounded-[0.5rem] !border !border-grey-4`,
                  errorMessage: ``,
                  description: `text-gray-6 font-[400] text-[0.875rem]`,
                  label: `!text-white font-[600]`,
                  base: selectedDb === `mongodb` ? `` : `hidden`
                }}
              />
            </ModalBody>
          )}
          <ModalFooter className="justify-start">
            <Button
              disabled={isPending}
              type="submit"
              color="danger"
              className="rounded-[0.25rem] bg-button-gradient-1 px-4 py-[0.62rem] font-[600]"
            >
              {isPending ? `Connection` : dbConnectActionLabels[selectedDb]}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-[2.5rem] mb-[2rem] md:mb-[4.75rem] ">
        <div
          onClick={() => {
            handleOpenDbConnection('mongodb');
          }}
          className="w-full h-[12.3125rem] p-8 grid place-items-center rounded-[1rem] border border-gray-2 cursor-pointer hover:bg-green-1/[0.05] transition-colors ease-in-out duration-300"
        >
          {dbImages['mongodb']}
        </div>

        <div
          onClick={() => {
            handleOpenDbConnection('postgresql');
          }}
          className="w-full h-[12.3125rem] p-8 grid place-items-center rounded-[1rem] border border-gray-2 cursor-pointer hover:bg-green-1/[0.05] transition-colors ease-in-out duration-300"
        >
          {dbImages['postgresql']}
        </div>

        <div
          onClick={() => {
            handleOpenDbConnection('mysql');
          }}
          className="w-full h-[12.3125rem] p-8 grid place-items-center rounded-[1rem] border border-gray-2 cursor-pointer hover:bg-green-1/[0.05] transition-colors ease-in-out duration-300"
        >
          {dbImages['mysql']}
        </div>
      </div>
    </>
  );
};

export default DbConnection;
