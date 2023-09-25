import Image from "next/image"

interface AuthLayoutProps {
  children: React.ReactNode
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <main className="grid min-h-screen grid-cols-2 overflow-hidden">
      <div className="relative p-10 text-white">
        <div className="relative flex items-center gap-2 z-10">
          <Image src="/logo.png" alt="Logo" width={24} height={24} />
          <p className="text-lg">AgriConnect</p>
        </div>
        <Image src="/auth-background.jpg" alt="Background" fill style={{ objectFit: "cover" }} />
        <div className="absolute bottom-10 flex flex-col gap-2 mr-10">
          <p className="text-lg">“This library has saved me countless hours of work and helped me deliver stunning designs to my clients faster than ever before.”</p>
          <p className="text-sm">Sofia Davis</p>
        </div>
      </div>
      {children}
    </main>
  )
}