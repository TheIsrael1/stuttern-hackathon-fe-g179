import { dbInterface } from '@/types/api.types';

export const constructDbDisplayName = (i?: dbInterface) => {
  if (i) {
    let preFix = ``;
    if (i?.type === 'mongodb') {
      preFix = 'Mongo DB';
    } else if (i?.type === 'postgresql') {
      preFix = 'Postgre SQL';
    } else {
      preFix = 'My SQL';
    }
    return `${preFix} ${i?.id?.slice(0, 4)}...`;
  }
};
