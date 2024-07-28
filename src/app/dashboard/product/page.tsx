"use client";
import { useState } from "react";

import { z } from "zod";
import { useRouter } from "next/navigation";
import TextInput from "@/app/components/input";
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

      //   const response = await createAccount({ email, name, password });

      //   if (response.mensagem) {
      //     router.push("/");
      //   }

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
    <main className="flex p-12">
      <div className="flex flex-col w-full">
        <h2 className="font-bold text-black text-2xl  mb-2 ">
          Create a new product
        </h2>
        <div className="w-full justify-center align-middle ">
          <form
            className="w-full flex flex-col justify-center align-middle"
            onSubmit={handleCreateAccoutn}
          >
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
                placeholder="Price"
                type="number"
                name="price"
                error={errors.price}
              />
            </div>
            <div className="my-4">
              <TextInput
                placeholder="Quantity"
                type="number"
                name="qtd"
                error={errors.qtd}
              />
            </div>
            <div className="my-4">
              <label htmlFor="file-upload" className="cursor-pointer">
                <div className="flex items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg">
                  <svg
                    className="w-6 h-6 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 4v16m8-8H4"
                    ></path>
                  </svg>
                  <span className="ml-2 text-sm text-gray-500">PNG/JPG</span>
                </div>
              </label>
              <input
                id="file-upload"
                name="file"
                type="file"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    console.log("File selected:", file.name);
                  }
                }}
              />
            </div>
            <button
              className="rounded-full bg-vivid-orange text-white p-2 w-1/3 mx-auto"
              type="submit"
            >
              Create Product
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
