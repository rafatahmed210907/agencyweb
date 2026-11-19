"use client";

import { Toaster as Sonner } from "sonner";

export function Toaster() {
  return (
    <Sonner
      theme="dark"
      position="bottom-right"
      toastOptions={{
        classNames: {
          toast:
            "!rounded-xl !border !border-[rgba(166,240,76,0.16)] !bg-[#0a0e0a] !text-[#f2f5ef] !shadow-xl",
          description: "!text-[#9aa79a]",
        },
      }}
    />
  );
}
