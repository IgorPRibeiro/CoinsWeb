"use client";
import { useState } from "react";

import { z } from "zod";
import { useRouter } from "next/navigation";
import TextInput from "@/app/components/input";
import Image from "next/image";
import api from "@/service";
const schema = z.object({
  price: z.string().min(1, { message: "This field has to be filled." }),
  name: z.string().min(1, { message: "This field has to be filled" }),
  qtd: z.string().min(1, { message: "This field has to be filled" }),
});

export default function CreateProduct() {
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const router = useRouter();
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [formValues, setFormValues] = useState({
    name: "",
    price: "",
    qtd: "",
  });

  async function handleCreateProduct(params: React.FormEvent<HTMLFormElement>) {
    console.log("first");
    params.preventDefault();
    const form = new FormData(params.currentTarget);
    const price = form.get("price")?.toString() || "";
    const qtd = form.get("qtd")?.toString() || "";
    const name = form.get("name")?.toString() || "";

    try {
      schema.parse({ price, name, qtd });
      let params = new FormData();
      params.append("name", name);
      params.append("price", price);
      params.append("quantity", qtd);

      if (imageFile) {
        params.append("product_image", imageFile);
      }

      const response = await api.post("/produtos/", params);
      if (response) {
        alert("Product registered successfully");
        setFormValues({ name: "", price: "", qtd: "" });
        setImagePreview(null);
        setImageFile(null);
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
    <main className="flex p-12">
      <div className="flex flex-col w-full bg-white rounded-md shadow-2xl p-12 ">
        <h2 className="font-bold text-black text-2xl  mb-2 ">
          Create a new product
        </h2>
        <div className="w-full justify-center align-middle ">
          <form
            className="w-full flex flex-col justify-center align-middle"
            onSubmit={handleCreateProduct}
          >
            <div className="my-4">
              <TextInput
                placeholder="Name"
                type="text"
                name="name"
                value={formValues.name}
                onChange={(e) =>
                  setFormValues({ ...formValues, name: e.target.value })
                }
                error={errors.name}
              />
            </div>
            <div className="my-4">
              <TextInput
                placeholder="Price"
                type="number"
                name="price"
                value={formValues.price}
                onChange={(e) =>
                  setFormValues({ ...formValues, price: e.target.value })
                }
                error={errors.price}
              />
            </div>
            <div className="my-4">
              <TextInput
                placeholder="Quantity"
                type="number"
                name="qtd"
                value={formValues.qtd}
                onChange={(e) =>
                  setFormValues({ ...formValues, qtd: e.target.value })
                }
                error={errors.qtd}
              />
            </div>
            <div className="my-4">
              {imagePreview ? (
                <div className="w-full my-4 flex justify-center items-center flex-col ">
                  <Image
                    src={imagePreview}
                    width={250}
                    height={250}
                    alt="file"
                    className="bg-red"
                  />
                  <button
                    className="rounded-full border-2 border-vivid-orange text-vivid-orange p-2 w-1/3 mx-auto my-4 font-bold"
                    type="button"
                    onClick={() => {
                      setImagePreview(null);
                    }}
                  >
                    Remove Image
                  </button>
                </div>
              ) : (
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
              )}

              <input
                id="file-upload"
                name="file"
                type="file"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    setImageFile(file);
                    const reader = new FileReader();
                    reader.onloadend = () => {
                      setImagePreview(reader.result as string);
                    };
                    reader.readAsDataURL(file);
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
