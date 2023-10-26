import MainNavBar from '@/components/main-navbar';
import { getCurrentUser } from '@/lib/session';

export default async function ProducerPage() {
  const user = await getCurrentUser();
  return (
    <>
      <MainNavBar role={user?.role || 'visitor'} />
      <main>ProducerPage</main>
    </>
  );
}
