"use client";

import { useRouter } from "next/navigation";

import TextInput from "./components/input";
import api from "@/service";
import { ILoginResponse, IUserResponse } from "@/@types/user";

export default function Login() {
  const router = useRouter();

  async function handleLogin(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const email = form.get("email");
    const password = form.get("password");

    const { data, status } = await api.post<ILoginResponse>("/users/login", {
      email,
      password,
    });
    if (data.token) {
      localStorage.setItem("authToken", data.token);
      const { data: user } = await api.get<IUserResponse>("/users", {
        headers: {
          Authorization: `Bearer ${data.token}`,
        },
      });

      localStorage.setItem("user", JSON.stringify(user));
      router.push("/dashboard");
    } else {
      console.error("Login failed", status);
    }
  }

  return (
    <main className="flex sm:justify-center">
      <div className="flex sm:w-screen flex-col items-center justify-center h-screen bg-white sm:items-center sm:justify-center">
        <h1 className="text-2xl sm:text-3xl sm:text-4xl w-full  font-bold text-vivid-orange text-center my-4">
          Welcome to your store manager Coins
        </h1>
        <form onSubmit={handleLogin} className="w-1/2">
          <div className="my-4">
            <TextInput placeholder="Email" type="text" name="email" />
          </div>
          <div className="my-4">
            <TextInput placeholder="Password" type="password" name="password" />
          </div>
          <button
            className="rounded-full bg-vivid-orange text-white p-2 w-full"
            type="submit"
          >
            Login
          </button>
        </form>
        <button
          className="rounded-full  text-black p-2 w-full"
          onClick={() => router.push("/signup")}
        >
          Create Account
        </button>
      </div>
      <div className="hidden sm:flex size-2/3 flex-col items-center justify-center h-screen bg-[url('/bgLogin.jfif')] bg-cover"></div>
    </main>
  );
}
