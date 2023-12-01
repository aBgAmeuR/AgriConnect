import { siteConfig } from '@/config/site'
import AuthProviders from '@/hooks/auth-provider'
import { QueryClientProvider } from '@/hooks/query-client-provider'
import { ThemeProvider } from '@/hooks/theme-provider'
import '@/styles/global.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = siteConfig

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <body className={inter.className} suppressHydrationWarning={true}>
        <AuthProviders>
          {/* <ThemeProvider> */}
          <QueryClientProvider>
            {children}
          </QueryClientProvider>
          {/* </ThemeProvider> */}
        </AuthProviders>
      </body>
    </html>
  )
}
