import React, { useEffect } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useQueryClient, useMutation, useQuery } from '@tanstack/react-query';
import { env } from '@/lib/env';
import { getCurrentUser } from '@/lib/session';
import { InfoOrder } from './schema';
import { Separator } from "@/components/ui/separator";
import { Document, PDFDownloadLink, Page, Text } from '@react-pdf/renderer';
import { DocumentPDF } from './documentPDF';

function useOrderById(orderId: string) {
  return useQuery<InfoOrder[]>({
    queryKey: ['order', orderId],
    queryFn: async () => {
      const user = await getCurrentUser();
      const data = await fetch(env.NEXT_PUBLIC_API_URL + '/order/' + orderId, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user?.accessToken}`,
        },
      })
        .then((res) => res.json())
        .then((res) => res.data)
        .catch((err) => console.log(err));

      if (Array.isArray(data)) return data;
      throw new Error('error occured');
    },
  });
}

type Props = {
  isOpenModal: boolean;
  setIsOpenModal: (isOpen: boolean) => void;
  orderId: string;
};


export const DataTableCommandeInfoDialog = ({ isOpenModal, setIsOpenModal, orderId }: Props) => {
  const { data, isLoading, isError } = useOrderById(orderId)

  if (isError) return <div>Error</div>;
  if (isLoading) return <div>Loading...</div>;



  return (
    <Dialog open={isOpenModal} onOpenChange={setIsOpenModal}>
      <DialogContent className="sm:max-w-[500px] sm:max-h-[700px] bg-[#ffffff] dark:bg-[#111315]">
        <DialogHeader>
          <DialogTitle>La commande</DialogTitle>
          <DialogDescription>Voici plus d'informations sur la commande:</DialogDescription>
          <div className="flex flex-col space-y-4">
            {data && (
              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                  Client : {data[0].client}
                </h3>
                <div className="flex items-center justify-between">
                  <p className=" text-gray-900 dark:text-gray-100">
                    Mail : {data[0].email_user}
                  </p>
                </div>
                <p className="text-gray-500 dark:text-gray-400">
                  Numéro : 0{data[0].phoneNumber_user}
                </p>
              </div>
            )}
          </div>
          <Separator />
          <div className="flex flex-col space-y-4 overflow-y-scroll">
            {data?.map((item) => (
              <>
                <div key={item.numero}>
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                      Produit commandé : {item.name_product}
                    </h3>
                    <p className="text-gray-500 dark:text-gray-400">
                      {item.price_product}
                    </p>
                  </div>
                  <p className="text-gray-500 dark:text-gray-400">
                    {item.desc_product}
                  </p>
                </div>
                <Separator />
              </>
            ))}
          </div>

          {isOpenModal && (
            <>
              <PDFDownloadLink
                document={<DocumentPDF data={data ?? []} />}
                fileName={`commande-${orderId}.pdf`}
              >
                {({ loading }: { loading: boolean }) =>
                  loading ? 'Chargement du document...' : 'Telecharcher la facture'
                }
              </PDFDownloadLink>
              <button onClick={() => setIsOpenModal(false)}>Fermer</button>
            </>
          )}
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
