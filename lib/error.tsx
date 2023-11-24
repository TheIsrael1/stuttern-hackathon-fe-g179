import toast from "react-hot-toast";

export class ResponseError extends Error {
  response: Response;

  constructor(message: string, res: Response) {
    super(message);
    this.response = res;
  }
}

const processError = (err: any) => {
  if (err instanceof ResponseError) {
    if (err.response.status === 404) {
      toast.error(`Not Found`);
    }
  }
};
