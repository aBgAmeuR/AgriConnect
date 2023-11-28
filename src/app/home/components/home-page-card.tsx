import { Button } from '@/components/ui/button';
import Link from 'next/link';

type Props = {
  title: string;
  description: string;
  href: string;
  buttonLabel: string;
};

export default function HomePageCard({ title, description, href, buttonLabel }: Props) {
  return (
    <div className="p-6 max-w-lg bg-white bg-opacity-75 flex flex-col justify-center items-center gap-4">
      <div className='text-center'>
        <h1 className="text-3xl font-semibold  leading-tight">{title}</h1>
        <p className="leading-tight mt-2">{description}</p>
      </div>
      <Link href={href}>
        <Button variant="default">{buttonLabel}</Button>
      </Link>
    </div>
  );
}
