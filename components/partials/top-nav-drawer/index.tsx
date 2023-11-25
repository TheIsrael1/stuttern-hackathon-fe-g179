'use client';

import { cn } from '@nextui-org/react';
import React from 'react';
import SideNav from '../side-nav';
import { createPortal } from 'react-dom';

const TopNavDrawer = ({
  navOpen,
  setNavOpen
}: {
  navOpen: boolean;
  setNavOpen: (i: boolean) => void;
}) => {
  return (
    <>
      {createPortal(
        <div
          className={cn(
            'fixed w-screen h-screen top-0 bottom-0 right-0 left-0 transition-all ease-in-out duration-300',
            navOpen ? `translate-x-0 opacity-100` : `translate-x-full opacity-0`
          )}
        >
          <SideNav onNavAction={() => setNavOpen(false)} />
        </div>,

        document.body
      )}
    </>
  );
};

export default TopNavDrawer;
