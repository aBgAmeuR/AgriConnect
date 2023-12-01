import React, { useEffect } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Order } from "../data/schema";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { env } from "@/lib/env";
import { getAccessToken } from '@/lib/get-access-token';
import { ProductItem } from '../../producer/[nom]/components/products-Items';

type Props = {
  isOpenModal: boolean;
  setIsOpenModal: (value: boolean) => void;
  order: Order;
}

export const DataTableCommandeInfoDialog = ({ isOpenModal, setIsOpenModal, order }: Props) => {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const accessToken = await getAccessToken();
        const response = await fetch(env.NEXT_PUBLIC_API_URL + '/order/' + order.numero, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`
          },
        });
        const data = await response.json();
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    };

    if (isOpenModal) {
      fetchData();
    }
  }, [isOpenModal, order]);

  return (
    <Dialog open={isOpenModal} onOpenChange={setIsOpenModal}>
      <DialogContent className="sm:max-w-[500px] bg-[#ffffff] dark:bg-[#111315]">
        <DialogHeader>
          <DialogTitle>La commande</DialogTitle>
          <DialogDescription>Voici plus d'informations sur la commande.</DialogDescription>
          {isOpenModal && (
            <>
              <button onClick={() => setIsOpenModal(false)}>Fermer</button>
            </>
          )}
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
