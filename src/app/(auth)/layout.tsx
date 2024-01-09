import AuthProviders from "@/hooks/auth-provider"
import { ThemeProvider } from "@/hooks/theme-provider"
import Image from "next/image"
import { Toaster } from "@/components/ui/toaster"
import { useRouter } from 'next/navigation';

interface AuthLayoutProps {
  children: React.ReactNode
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  

  return (
    <AuthProviders>
      <ThemeProvider>
        <main className="grid min-h-screen grid-cols-2 overflow-hidden">
          <div className="relative p-10 text-white">
            <div className="relative flex items-center gap-2 z-10">
              <Image src="/logo.png" alt="Logo" width={24} height={24} />
              <p className="text-lg">AgriConnect</p>
            </div>
            <Image src="/auth-background.jpg" alt="Background" fill style={{ objectFit: "cover" }} />
            <div className="absolute bottom-10 flex flex-col gap-2 mr-10">
              
            </div>
          </div>
          {children}
        </main>
        <Toaster />
      </ThemeProvider>
    </AuthProviders>
  )
}