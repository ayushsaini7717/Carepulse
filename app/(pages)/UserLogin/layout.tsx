// components/ModalLayout.tsx
"use client";

import { useSearchParams } from "next/navigation";

export default function ModalLayout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  const queryParams = useSearchParams();
  const isModal = queryParams.get("modal");

  return (
    <div>
      {children}
      {isModal ? modal : null}
    </div>
  );
}
