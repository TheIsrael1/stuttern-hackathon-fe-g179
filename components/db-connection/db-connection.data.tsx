import mongoImg from '@/assets/svg/mongo.svg';
import postgreImg from '@/assets/svg/postgre.svg';
import segmentImg from '@/assets/svg/segment.svg';
import { dbTypeTypes } from '@/types/api.types';
import Image from 'next/image';

export const dbImages: Record<dbTypeTypes, JSX.Element> = {
  mongodb: <Image src={mongoImg} alt="" />,
  mysql: <Image src={segmentImg} alt="" />,
  postgresql: <Image src={postgreImg} alt="" />
};

export const dbConnectActionLabels: Record<dbTypeTypes, string> = {
  mongodb: `Connect MongoDB`,
  mysql: `Connect Database`,
  postgresql: `Connect Postgre`
};
