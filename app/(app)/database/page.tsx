// import Boop from '@/components/animation/Boop';
import mongoImg from '@/assets/svg/mongo.svg';
import postgreImg from '@/assets/svg/postgre.svg';
import segmentImg from '@/assets/svg/segment.svg';
import Image from 'next/image';

export default function page() {
  return (
    <main className="w-full container px-container-base flex flex-col py-[4rem] md:py-[7.6rem] max-w-[56.9rem] mx-auto">
      <h3 className="text-[1.5rem] md:text-[2rem] font-[700] text-white mb-[3rem] md:mb-[4.88rem]">
        Connect your database
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-[2.5rem] mb-[2rem] md:mb-[4.75rem] ">
        <div className="w-full h-[12.3125rem] p-8 grid place-items-center rounded-[1rem] border border-gray-2 cursor-pointer hover:bg-green-1/[0.05] transition-colors ease-in-out duration-300">
          <Image src={mongoImg} alt="" />
        </div>

        <div className="w-full h-[12.3125rem] p-8 grid place-items-center rounded-[1rem] border border-gray-2 cursor-pointer hover:bg-green-1/[0.05] transition-colors ease-in-out duration-300">
          <Image src={postgreImg} alt="" />
        </div>

        <div className="w-full h-[12.3125rem] p-8 grid place-items-center rounded-[1rem] border border-gray-2 cursor-pointer hover:bg-green-1/[0.05] transition-colors ease-in-out duration-300">
          <Image src={segmentImg} alt="" />
        </div>
      </div>
      <p className="font-[500] leading-[1.5625rem] text-center max-w-[40.25rem] mx-auto text-white">
        We are working on expanding our database connections, opening new avenues for seamless
        integration and endless possibilities. Stay tuned for the next wave of connectivity!
      </p>
    </main>
  );
}
