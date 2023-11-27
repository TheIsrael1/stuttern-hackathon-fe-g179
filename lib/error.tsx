import toast from 'react-hot-toast';

export class ResponseError extends Error {
  response: Response;

  constructor(message: string, res: Response) {
    super(message);
    this.response = res;
  }
}

export const processError = (err: any): ResponseError => {
  if (err instanceof ResponseError) {
    toast.error(`${err?.message}`);
  }

  return err;
};
