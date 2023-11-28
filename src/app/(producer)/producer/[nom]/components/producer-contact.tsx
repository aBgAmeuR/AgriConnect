import { Button } from '@/components/ui/button';
import { MapPin, Phone } from 'lucide-react';
import { ProducerData } from '@/types/producer';

export default function ProducerContact({ data }: { data: ProducerData }) {
  return (
    <div className="flex flex-col md:flex-row gap-4 mb-6">
      <div className="flex-1 bg-white shadow rounded-lg p-4">
        <p className="text-base font-semibold mb-2">{data.name}</p>
        <div className="flex flex-row gap-1 items-center mb-2">
          <MapPin size={16} />
          <p className="text-sm">{data.address}</p>
        </div>
        <div className="flex flex-row gap-1 items-center mb-2">
          <Phone size={16} />
          <p className="text-sm">{data.phoneNumber}</p>
        </div>
        <Button className="mt-24 bg-white text-green-500 hover:text-white">Envoyer un message</Button>
      </div>
      <div className="flex-1">
        <iframe
          width="100%"
          height="250"
          style={{ border: 0 }}
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2671.01693532427!2d0.23172727596657253!3d47.974731162484794!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e28e9168064bf9%3A0x5fe449cebb942c60!2s123%20Rue%20de%20Lille%2C%2072100%20Le%20Mans!5e0!3m2!1sfr!2sfr!4v1700735855715!5m2!1sfr!2sfr"
          allowFullScreen></iframe>
      </div>
    </div>
  );
}
