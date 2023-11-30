'use client';

import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
  Spinner
} from '@nextui-org/react';
import DbIcon from '@/assets/svg/dbIcon';
import { dbInterface } from '@/types/api.types';
import useAuthStore from '@/store/useAuthStore';
import { dbImages } from '../db-connection/db-connection.data';
import { useMemo } from 'react';
import { constructDbDisplayName } from './db-toggler.utils';

interface IDbToggler {
  databases?: dbInterface[];
  isLoading?: boolean;
}

const DbToggler = ({ databases, isLoading }: IDbToggler) => {
  const { activeDb, setActiveDb } = useAuthStore((store) => store);

  const activeDbData = useMemo(() => {
    const res = databases?.find((i) => i?.id === activeDb);
    return res;
  }, [activeDb, databases]);

  return (
    <Dropdown className="dark">
      <DropdownTrigger>
        <Button
          className={
            ' bg-transparent text-white  hover:bg-white/10 focus:outline-none transition-transform'
          }
          endContent={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-4 h-4 text-current"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
            </svg>
          }
        >
          <span>{constructDbDisplayName(activeDbData) ?? `Select DB`}</span>
          <DbIcon />
        </Button>
      </DropdownTrigger>
      <DropdownMenu aria-label="Static Actions" className="p-4">
        {isLoading ? (
          <Spinner color="white" className="mx-auto" />
        ) : databases?.length ? (
          databases?.map((i, idx) => (
            <DropdownItem onClick={() => setActiveDb(i?.id)} className="text-white" key={idx}>
              {constructDbDisplayName(i)}
            </DropdownItem>
          ))
        ) : (
          <DropdownItem className="text-white">No Databases</DropdownItem>
        )}
      </DropdownMenu>
    </Dropdown>
  );
};

export default DbToggler;
