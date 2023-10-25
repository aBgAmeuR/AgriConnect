import MainNavBar from "@/components/main-navbar"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card } from "@/components/ui/card"
import { getCurrentUser } from "@/lib/session"
import Image from "next/image"
import { Phone, MapPin } from 'lucide-react'
import { Button } from "@/components/ui/button"

type ProducerData = {
  name: string
  desc: string
  payement: string
  adress: string
  phoneNumber: string
  category: string
}

const GetData = async () => {
  const producerData = {
    name: "Les fruits de marie",
    desc: "Producteur de fruits",
    payement: "Carte",
    adress: "123 rue de Lille",
    phoneNumber: "567891234",
    category: "Fruits",
  }
  return producerData
}

export default async function ProducerPage({ params }: { params: { nom: string } }) {
  const user = await getCurrentUser()
  const data: ProducerData = await GetData()

  return (
    <>
      <MainNavBar role={user?.role || "visitor"} />
      <div className="absolute -z-10 w-full h-[100px]">
        <Image src="/producer-page-bg.png" alt="background image" fill style={{ objectFit: "cover" }} />
      </div>
      <main className="flex flex-row gap-4 justify-center mx-16 mt-20">
        <aside>
          <Card className="flex flex-col divide-y gap-4 w-[200px]">
            <div className="px-6 pt-6 flex flex-col gap-3 items-center justify-center h-fit">
              <Avatar>
                <AvatarImage src="https://github.com/abgameur.png" />
                <AvatarFallback>{data.name.split(/\s/).reduce((response, word) => response += word.slice(0, 1), '')}</AvatarFallback>
              </Avatar>
              <p className="text-base text-center">{data.name}</p>
            </div>
            <div className="px-6 pb-6 pt-4 flex flex-col gap-3 h-fit">
              <div className="flex flex-row gap-1 items-center">
                <MapPin size={16} />
                <p className="text-sm text-muted-foreground">{data.adress}</p>
              </div>
              <div className="flex flex-row gap-1 items-center">
                <Phone size={16} />
                <p className="text-sm text-muted-foreground">{data.phoneNumber}</p>
              </div>
              <Button className="w-full">Contacter</Button>
            </div>
          </Card>
        </aside>
        <div className="w-full">
          <h1>Producer</h1>
          <p>{data.name}</p>
        </div>
      </main>
    </>
  )
}
