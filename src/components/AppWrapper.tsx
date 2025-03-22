"use client";

import { useEffect } from "react";
import ClientHeader from "./ClientHeader";

export default function AppWrapper({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ClientHeader />
      <main>{children}</main>
    </>
  );
}