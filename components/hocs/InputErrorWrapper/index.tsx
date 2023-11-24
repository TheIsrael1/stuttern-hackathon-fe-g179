import { cn } from '@nextui-org/react';

interface IInputErrorWrapper {
  children: React.ReactNode;
  error?: string;
  className?: string;
}

const InputErrorWrapper = ({ error, className, children }: IInputErrorWrapper) => {
  return (
    <div className={cn('w-full flex flex-col gap-1', className)}>
      {children}
      <span
        className={`text-red-500 text-[14px] ${
          !error ? `hidden` : `flex`
        } transition-all ease-in-out duration-300`}
      >
        {`${error}`}
      </span>
    </div>
  );
};

export default InputErrorWrapper;
