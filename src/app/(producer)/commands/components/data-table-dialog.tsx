import React from 'react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Order } from "../data/schema"

type Props = {
  isOpenModal: boolean;
  setIsOpenModal: (value: boolean) => void;
  order: Order;
}

export const DataTableCommandeInfoDialog = ({ isOpenModal, setIsOpenModal, order }: Props) => {
  return (
    <Dialog open={isOpenModal} onOpenChange={setIsOpenModal}>
      <DialogContent className="sm:max-w-[500px] bg-[#ffffff] dark:bg-[#111315]">
        <DialogHeader>
          <DialogTitle>la command</DialogTitle>
          <DialogDescription>voici plus d'informantion sur la commandes.</DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}


