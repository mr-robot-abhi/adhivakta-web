"use client";

import dynamic from "next/dynamic";

const Header = dynamic(() => import("./Header"), {
  ssr: false,
  loading: () => <div className="bg-indigo-600 h-16"></div>,
});

export default function ClientHeader() {
  return <Header />;
}