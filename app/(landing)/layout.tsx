import LandingNav from '@/components/partials/landing-nav';
import { BankGroundTinitLight } from './landing.components';

const ExternalLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen relative  w-full font-inter bg-black-2 md:bg-black-1 pt-[3.69rem]  md:pt-[2.75rem] ">
      <BankGroundTinitLight className="absolute top-[5.31rem] right-0 md:hidden" />
      <LandingNav />
      {children}
    </div>
  );
};

export default ExternalLayout;
