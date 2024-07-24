"use client";
import { useState } from "react";
import TextInput from "../components/input";

import { z } from "zod";
import { useRouter } from "next/navigation";
import createAccount from "./api/createAccount";

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
  const router = useRouter();

  async function handleCreateAccoutn(params: React.FormEvent<HTMLFormElement>) {
    params.preventDefault();
    const form = new FormData(params.currentTarget);
    const email = form.get("email")?.toString() || "";
    const name = form.get("name")?.toString() || "";
    const password = form.get("password")?.toString() || "";
    try {
      schema.parse({ email, name, password });

      const response = await createAccount({ email, name, password });

      if (response.mensagem) {
        router.push("/");
      }

      setErrors({});
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors: { [key: string]: string } = {};
        error.errors.forEach((err) => {
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
            <TextInput
              placeholder="Email"
              type="text"
              name="email"
              error={errors.email}
            />
          </div>
          <div className="my-4">
            <TextInput
              placeholder="Name"
              type="text"
              name="name"
              error={errors.name}
            />
          </div>
          <div className="my-4">
            <TextInput
              placeholder="Password"
              type="password"
              name="password"
              error={errors.password}
            />
          </div>
          <button
            className="rounded-full bg-vivid-orange text-white p-2 w-full"
            type="submit"
          >
            Create Account
          </button>
        </form>
        <button
          className=" text-black p-2 w-full"
          onClick={() => router.back()}
        >
          I already have an account
        </button>
      </div>
    </main>
  );
}
