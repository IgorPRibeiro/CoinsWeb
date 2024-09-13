"use client";

import React, { useEffect, useState } from "react";

import { useRouter } from "next/navigation";
import Link from "next/link";
export default function Header() {
  const router = useRouter();
  const [userName, setUserName] = useState<string>("");
  const [showHideBar, setShowHideBar] = useState<boolean>(false);

  useEffect(() => {
    const userString = localStorage.getItem("user");
    if (userString) {
      const user = JSON.parse(userString);
      setUserName(user.name);
    }
  }, []);
  return (
    <>
      <header className="sm:block md:block lg:hidden xl:hidden absolute left-4 top-4">
        <button
          onClick={() => setShowHideBar(!showHideBar)}
          className="bg-vivid-orange p-1 rounded-lg"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            width="26"
            height="26"
            viewBox="0 0 50 50"
            fill="white"
          >
            <path d="M 0 9 L 0 11 L 50 11 L 50 9 Z M 0 24 L 0 26 L 50 26 L 50 24 Z M 0 39 L 0 41 L 50 41 L 50 39 Z"></path>
          </svg>
        </button>
      </header>
      <aside
        className={
          showHideBar
            ? "hidden"
            : "lg:hidden xl:hidden w-2/6 bg-vivid-orange absolute left-0 h-full "
        }
      >
        <button
          onClick={() => setShowHideBar(!showHideBar)}
          className=" p-1 flex w-full justify-center items-center  "
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            width="26"
            height="26"
            viewBox="0 0 50 50"
            fill="white"
          >
            <path d="M 0 9 L 0 11 L 50 11 L 50 9 Z M 0 24 L 0 26 L 50 26 L 50 24 Z M 0 39 L 0 41 L 50 41 L 50 39 Z"></path>
          </svg>
        </button>
        <div>
          <div className="w-full py-5 justify-center align-middle text-center">
            <span className=" font-semibold">Hello, {userName}</span>
          </div>
          <ul className="flex-grow">
            <li className="ml-2 mt-1 hover:bg-gray-700">
              <Link href="/dashboard/product">Products</Link>
            </li>

            <li className="ml-2 mt-1 hover:bg-gray-700">Sales</li>
          </ul>
        </div>
        <div className="flex w-full absolute bottom-2">
          <button
            onClick={() => router.push("/")}
            className="flex w-full items-center justify-between p-2 bg-transparent border-none cursor-pointer "
          >
            <h2>Sair</h2>
            <svg
              xmlSpace="preserve"
              width={20}
              height={20}
              fill="white"
              viewBox="0 0 384.971 384.971"
            >
              <path d="M180.455 360.91H24.061V24.061h156.394c6.641 0 12.03-5.39 12.03-12.03s-5.39-12.03-12.03-12.03H12.03C5.39.001 0 5.39 0 12.031V372.94c0 6.641 5.39 12.03 12.03 12.03h168.424c6.641 0 12.03-5.39 12.03-12.03.001-6.641-5.389-12.03-12.029-12.03z" />

              <path d="m381.481 184.088-83.009-84.2a11.942 11.942 0 0 0-17.011 0c-4.704 4.74-4.704 12.439 0 17.179l62.558 63.46H96.279c-6.641 0-12.03 5.438-12.03 12.151s5.39 12.151 12.03 12.151h247.74l-62.558 63.46c-4.704 4.752-4.704 12.439 0 17.179a11.931 11.931 0 0 0 17.011 0l82.997-84.2c4.644-4.68 4.692-12.512.012-17.18z" />
            </svg>
          </button>
        </div>
      </aside>
      <header className="hidden lg:flex xl:flex w-full h-1/10 bg-vivid-orange text-white justify-between items-center p-4">
        <h1 className="text-xl">Dashboard</h1>

        <div className="flex items-center">
          <span className="mr-4">Olá, {userName}</span>

          <button
            onClick={() => router.push("/")}
            className="flex items-center justify-center p-2 bg-transparent border-none cursor-pointer"
          >
            <svg
              xmlSpace="preserve"
              width={20}
              height={20}
              viewBox="0 0 384.971 384.971"
            >
              <path d="M180.455 360.91H24.061V24.061h156.394c6.641 0 12.03-5.39 12.03-12.03s-5.39-12.03-12.03-12.03H12.03C5.39.001 0 5.39 0 12.031V372.94c0 6.641 5.39 12.03 12.03 12.03h168.424c6.641 0 12.03-5.39 12.03-12.03.001-6.641-5.389-12.03-12.029-12.03z" />

              <path d="m381.481 184.088-83.009-84.2a11.942 11.942 0 0 0-17.011 0c-4.704 4.74-4.704 12.439 0 17.179l62.558 63.46H96.279c-6.641 0-12.03 5.438-12.03 12.151s5.39 12.151 12.03 12.151h247.74l-62.558 63.46c-4.704 4.752-4.704 12.439 0 17.179a11.931 11.931 0 0 0 17.011 0l82.997-84.2c4.644-4.68 4.692-12.512.012-17.18z" />
            </svg>
          </button>
        </div>
      </header>
      <aside className="hidden lg:flex xl:flex w-64 bg-vivid-orange text-white  flex-col justify-between absolute left-0 h-full">
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
              d="M19.428 15.341a1.5 1.5 0 00.416-1.341l-.3-1.2a1.5 1.5 0 00-.416-.75l-1.05-1.05a1.5 1.5 0 00-.75-.416l-1.2-.3a1.5 1.5 0 00-1.341.416l-1.05 1.05a1.5 1.5 0 00.416.75l-.3 1.2a1.5 1.5 0 00.416 1.341l1.05 1.05a1.5 1.5 0 00.75.416l1.2.3a1.5 1.5 0 001.341-.416l1.05-1.05zM12 8.5a3.5 3.5 0 100 7 3.5 3.5 0 000-7zM4.572 8.659a1.5 1.5 0 00-.416 1.341l.3 1.2a1.5 1.5 0 00.416.75l1.05 1.05a1.5 1.5 0 00.75.416l1.2.3a1.5 1.5 0 001.341-.416l1.05-1.05a1.5 1.5 0 00.416-.75l.3-1.2a1.5 1.5 0 00-.416-1.341l-1.05-1.05a1.5 1.5 0 00-.75-.416l-1.2-.3a1.5 1.5 0 00-1.341.416l-1.05 1.05z"
            />
          </svg>
        </div>
      </aside>
    </>
  );
}
