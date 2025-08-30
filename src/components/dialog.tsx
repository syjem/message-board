"use client";

import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { UsernameForm } from "./form";
import { Dispatch, SetStateAction } from "react";

export function UsernameDialog({
  open,
  setOpen,
  username,
}: {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  username: string;
}) {
  return (
    <Dialog open={open} onClose={setOpen} className="relative z-10">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-black/70 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"
      />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <DialogPanel
            transition
            className="relative w-full transform overflow-hidden rounded-lg bg-gray-800 text-left shadow-xl outline -outline-offset-1 outline-white/10 transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 sm:w-full sm:max-w-lg data-closed:sm:translate-y-0 data-closed:sm:scale-95"
          >
            <div className="px-6 py-8 flex flex-col gap-y-5">
              <DialogTitle
                as="h3"
                className="text-2xl text-center font-semibold text-white"
              >
                Enter chat as
              </DialogTitle>
              <UsernameForm setOpen={setOpen} username={username} />
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}
