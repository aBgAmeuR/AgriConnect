import AuthProviders from '@/hooks/auth-provider'
import { ThemeProvider } from '@/hooks/theme-provider'
import '@/styles/global.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'AgriConnect',
  description: 'AgriConnect',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <body className={inter.className}>
        <AuthProviders>
          <ThemeProvider>
            {children}
          </ThemeProvider>
        </AuthProviders>
      </body>
    </html>
  )
}
