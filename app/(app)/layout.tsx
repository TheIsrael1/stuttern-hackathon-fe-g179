import SideNav from '@/components/partials/side-nav';
import TopNav from '@/components/partials/top-nav';
import { headers } from 'next/headers';

const AppLayout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-screen flex w-full bg-black-1 font-inter">
      <aside className="hidden md:block h-full w-max z-[1] overflow-visible">
        <SideNav />
      </aside>
      <div className="flex flex-col flex-grow overflow-auto">
        <TopNav />
        {children}
      </div>
    </div>
  );
};

export default AppLayout;
