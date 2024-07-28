"use client";

import React from "react";

import { useRouter } from "next/navigation";
export default function Header() {
  const router = useRouter();
  const [userName, setUserName] = React.useState<string>("");

  React.useEffect(() => {
    const userString = localStorage.getItem("user");
    if (userString) {
      const user = JSON.parse(userString);
      setUserName(user.name);
    }
  }, []);
  return (
    <header className="w-full h-1/10 bg-vivid-orange text-white flex justify-between items-center p-4">
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
  );
}
