import { signOut } from 'next-auth/react';
import { redirect } from 'next/navigation';

export default async function Logout() {
  await signOut({ redirect: false, callbackUrl: "/login" });
  redirect("/login");

  return null;
}
