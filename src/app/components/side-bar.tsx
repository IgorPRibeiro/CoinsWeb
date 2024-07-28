"use client";
import Link from "next/link";
import React from "react";

export default function SideBar() {
  return (
    <aside className="w-64 bg-vivid-orange text-white flex flex-col justify-between">
      <div className="w-full py-5 justify-center align-middle text-center">
        <p className="text-white">Coins</p>
      </div>
      <ul className="flex-grow">
        <li className="p-4 hover:bg-gray-700">
          <Link href="/dashboard/product">PRODUCTS</Link>
        </li>
        <li className="p-4 hover:bg-gray-700">PEDIDOS</li>
      </ul>
      <div className="p-4 hover:bg-gray-700 flex justify-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19.428 15.341a1.5 1.5 0 00.416-1.341l-.3-1.2a1.5 1.5 0 00-.416-.75l-1.05-1.05a1.5 1.5 0 00-.75-.416l-1.2-.3a1.5 1.5 0 00-1.341.416l-1.05 1.05a1.5 1.5 0 00-.416.75l-.3 1.2a1.5 1.5 0 00.416 1.341l1.05 1.05a1.5 1.5 0 00.75.416l1.2.3a1.5 1.5 0 001.341-.416l1.05-1.05zM12 8.5a3.5 3.5 0 100 7 3.5 3.5 0 000-7zM4.572 8.659a1.5 1.5 0 00-.416 1.341l.3 1.2a1.5 1.5 0 00.416.75l1.05 1.05a1.5 1.5 0 00.75.416l1.2.3a1.5 1.5 0 001.341-.416l1.05-1.05a1.5 1.5 0 00.416-.75l.3-1.2a1.5 1.5 0 00-.416-1.341l-1.05-1.05a1.5 1.5 0 00-.75-.416l-1.2-.3a1.5 1.5 0 00-1.341.416l-1.05 1.05z"
          />
        </svg>
      </div>
    </aside>
  );
}
