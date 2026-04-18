"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { LogOut, AlertCircle } from "lucide-react";

interface LogoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export function LogoutModal({ isOpen, onClose, onConfirm }: LogoutModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-[#02011A]/90 border-white/10 backdrop-blur-xl rounded-[2.5rem] max-w-[90%] sm:max-w-[425px]">
        <DialogHeader className="flex flex-col items-center gap-4">
          <div className="h-16 w-16 rounded-full bg-red-500/10 flex items-center justify-center border border-red-500/20">
            <AlertCircle size={32} className="text-red-500" />
          </div>
          <DialogTitle className="text-2xl font-bold text-white text-center">
            ¿Seguro que quieres cerrar sesión?
          </DialogTitle>
          <DialogDescription className="text-blue-200/60 text-center text-base">
            
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="flex flex-col sm:flex-row gap-3 mt-6">
          {/*
          <Button
            variant="ghost"
            onClick={onClose}
            className="flex-1 h-14 rounded-2xl text-blue-200/60 hover:text-white hover:bg-white/5 border border-white/5 transition-all"
          >
            Cancelar
          </Button>
           */}
          <Button
            onClick={onConfirm}
            style={{ backgroundColor: '#02011A',
              borderColor: '#0055FF'
             }}
            className="w-full h-20 rounded-full border-[1.5px] text-white text-xl font-medium transition-all flex gap-3 items-center justify-center shadow-[0_0_20px_rgba(0,85,255,0.2)] hover:opacity-90 active:scale-[0.97]"
          >
            <LogOut size={18} />
            Cerrar Sesión
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}