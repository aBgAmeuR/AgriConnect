import { signOut } from 'next-auth/react';
import { redirect } from 'next/navigation';

export default async function Logout() {
  await signOut({ redirect: true, callbackUrl: "/login" });

  return <h1></h1>;
}
