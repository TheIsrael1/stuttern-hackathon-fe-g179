import Image from 'next/image';
import bannerImg from '@/assets/svg/login/loginBanner.svg';
import topLeft from '@/assets/svg/login/topLeft.svg';
import bottomRight from '@/assets/svg/login/bottomRight.svg';
import { getServerSession } from 'next-auth';
import { options } from '@/app/api/auth/[...nextauth]/option';
import { redirect } from 'next/navigation';
import LoginBtn from '@/components/login-btn';

export default async function page() {
  const session = await getServerSession(options);
  if (session) {
    redirect('/ask');
  } else
    return (
      <main className="w-full  flex items-center justify-center md:py-[3.19rem] md:px-container-base bg-black-1 relative min-h-screen">
        <div className="z-[2] w-full min-h-screen md:min-h-max  relative container  max-w-[73.75rem] mx-auto  bg-black-2 md:rounded-[1rem] px-[0.94rem] py-[1.19rem] grid grid-cols-1 md:grid-cols-2">
          <div className="flex flex-col items-center justify-center gap-[1.88rem] px-[4.69rem]">
            {/* <span className="text-[white] text-[0.875rem]">sign in with</span> */}
            <LoginBtn />
          </div>
          <div className="hidden md:flex">
            <Image alt="" src={bannerImg} />
          </div>
        </div>
        <div className="absolute top-0 left-0 z-10 md:z-0">
          <Image alt="" src={topLeft} />
        </div>
        <div className="absolute bottom-0 right-0 z-10 md:z-0">
          <Image alt="" src={bottomRight} />
        </div>
      </main>
    );
}
