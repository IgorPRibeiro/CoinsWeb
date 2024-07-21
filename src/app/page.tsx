"use client";

import { useState } from "react";
import TextInput from "./components/input";

export default function Home() {

  const [error, setError] = useState<string | null>(null);

  async function handleLogin(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const email = form.get('email');
    const password = form.get('password');

    const response = await fetch('http://localhost:3001/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    });
    console.log(response)
    if (response.ok) {
      console.log('Login successful');
      setError(null);
      // Handle successful login
    } else {
      console.error('Login failed', response.status, response.statusText);
      setError('Login failed: ' + response.statusText);
      // Handle login failure
    }
  }


  return (
    <main className="flex ">
      <div className="flex size-1/3 flex-col items-center justify-center h-screen bg-white">
        <h1 className="text-4xl font-bold text-vivid-orange text-center my-4">
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
      </div>
      <div className="flex size-2/3 flex-col items-center justify-center h-screen bg-[url('/bgLogin.jfif')] bg-cover	"></div>
    </main>
  );
}
