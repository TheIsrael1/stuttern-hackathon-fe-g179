import { cn } from '@nextui-org/react';

export const BackGroundTint = ({ className }: { className?: string }) => {
  return (
    <div
      className={cn(
        ' w-[32.875rem] h-[32.875rem] blur-[250px] bg-green-1 rounded-[32.875rem]',
        className
      )}
    ></div>
  );
};

export const BankGroundTinitLight = ({ className }: { className?: string }) => {
  return (
    <div
      className={cn('w-[16rem] h-[16rem] blur-[151.85000610351562px] bg-green-1/50', className)}
    ></div>
  );
};
