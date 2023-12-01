import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';


<Dialog open={isOpenModal} onOpenChange={setIsOpenModal}>
        <DialogContent className="sm:max-w-[500px] bg-[#ffffff] dark:bg-[#111315]">
          <DialogHeader>
            <DialogTitle>la command</DialogTitle>
            <DialogDescription>voici plus d'informantion sur la commandes.</DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>