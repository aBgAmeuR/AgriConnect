import MainNavBar from '@/components/main-navbar';
import { getCurrentUser } from '@/lib/session';
import { TabsAccount } from '@/app/account/tabs-account';
import { EditProducer } from './edit-producer';

export default async function Account() {
  const user = await getCurrentUser();
  const producerId = user?.role;
  const userName = user?.id ?? '';
  console.log(producerId); // Affichez le nom de l'utilisateur dans la console

  return (
    <>
      <MainNavBar role={user?.role || 'producer'} />
      <main className="flex flex-col items-center">
        <div className="w-full max-w-4xl p-4">{producerId && <EditProducer id={userName} />}</div>
      </main>
    </>
  );
}
