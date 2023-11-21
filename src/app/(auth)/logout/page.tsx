'use client';

import { signOut } from 'next-auth/react';

export default function Logout() {
  signOut({ redirect: true, callbackUrl: "/login" });

  return <h1></h1>;
}
