import React from "react";

interface TextInputProps {
  placeholder: string;
  type: string;
  name: string;
}

const TextInput = ({ placeholder, type, name }: TextInputProps) => {
  return (
    <input
      className="placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-lg py-2 pl-3 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm text-black"
      placeholder={placeholder}
      type={type}
      name={name}
    />
  );
};

export default TextInput;

