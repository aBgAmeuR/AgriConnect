import { cn } from '@/lib/utils';
import React from 'react';
 
interface StepProps {
  number: number;
  label: string;
}

interface StepsProps {
  current: number;
  children: React.ReactElement<StepProps>[];
  className?: string;
}

const Step: React.FC<StepProps> = ({ number, label }) => {
  return (
    <>
      <div className="flex items-center justify-center text-sm min-h-full min-w-full">{number}</div>
      <div className="text-center mb-2 text-black whitespace-nowrap">{label}</div>
    </>
  );
};

const Steps: React.FC<StepsProps> = ({ current, children, className }) => {
  return (
    <div className={cn("h-[75px]", className)}>
      <div className='flex space-x-4 items-center'>
        {React.Children.map(children, (child, index) => (
          <>
            <div className={cn("flex flex-col items-center h-12 w-12 border rounded-[50%] ", { 'text-white bg-green-600': index < current })}>
              {React.cloneElement(child)}
            </div>
            {index < children.length - 1 && (
              <div className="flex-1 border-b border-gray-300"></div>
            )}
          </>
        ))}
      </div>
    </div>
  );
};

export { Steps, Step };