import MainNavBar from '@/components/main-navbar'
import { getCurrentUser } from '@/lib/session'
import { TabsAccount } from '@/app/account/tabs-account';
import { useRouter } from 'next/navigation';

export default async function Account() {
  const user = await getCurrentUser();

  if (user?.role === 'visitor' || !user) {
    const router = useRouter();
    router.push('/');
  }

  return (
    <>
      <MainNavBar role={user?.role || "visitor"} />
      <main className='flex flex-col items-center'>
        <div className='w-full max-w-4xl p-4'>
          <h1 className='text-xl mx-4'>Paramètres</h1>
          <p className='text-muted-foreground mx-4'>Gérer les paramètres de votre compte.</p>
          <hr className="h-px my-6 mx-4 bg-gray-200 border-0 dark:bg-gray-700" />
          <TabsAccount />
        </div>
      </main>
    </>
  )
}
