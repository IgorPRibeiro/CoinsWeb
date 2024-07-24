"use client";
import { useState } from "react";
import TextInput from "../components/input";

import { z } from "zod";

const schema = z.object({
  email: z
    .string()
    .min(1, { message: "This field has to be filled." })
    .email("This is not a valid email!"),
  name: z.string().min(1, { message: "This field has to be filled" }),
  password: z.string().min(1, { message: "This field has to be filled" }),
});

export default function SignUp() {
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  async function handleCreateAccoutn(params: React.FormEvent<HTMLFormElement>) {
    params.preventDefault();
    const form = new FormData(params.currentTarget);
    const email = form.get("email");
    const name = form.get("name");
    const password = form.get("password");
    try {
      schema.parse({ email, name, password });
      setErrors({});
    } catch (error) {
        if (error instanceof z.ZodError) {
          const fieldErrors: { [key: string]: string } = {};
          error.errors.forEach(err => {
            if (err.path.length > 0) {
              fieldErrors[err.path[0]] = err.message;
            }
          });
          setErrors(fieldErrors);
        }
      }

  }

  return (
    <main className="flex bg-gradient-to-b from-vivid-orange  to-indigo-100  justify-center items-center min-h-screen">
      <div className="flex align-middle p-12 rounded-md bg-white flex-col">
        <div>
          <h1 className="font-bold text-black text-center text-4xl mb-2">
            SignUp
          </h1>
          <h3 className="font-normal text-black text-center">
            Create a new account
          </h3>
        </div>
        <form onSubmit={handleCreateAccoutn}>
        <div className="my-4">
            <TextInput placeholder="Email" type="text" name="email" />
            {errors.email && <p className="text-red-500">{errors.email}</p>}
          </div>
          <div className="my-4">
            <TextInput placeholder="Name" type="text" name="name" />
            {errors.name && <p className="text-red-500">{errors.name}</p>}
          </div>
          <div className="my-4">
            <TextInput placeholder="Password" type="password" name="password" />
            {errors.password && <p className="text-red-500">{errors.password}</p>}
          </div>
          <button
            className="rounded-full bg-vivid-orange text-white p-2 w-full"
            type="submit"
          >
            Create Account
          </button>
        </form>
      </div>
    </main>
  );
}
