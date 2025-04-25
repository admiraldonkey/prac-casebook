import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  typeName: "normal" | "delete";
  children: React.ReactNode;
}
export default function Button(props: ButtonProps) {
  const { typeName, children, ...rest } = props;
  const types = {
    normal:
      "bg-govgreen text-white hover:bg-govbluehover hover:drop-shadow-govblue",
    delete: "hover:text-brightred ml-6",
  };
  return (
    <button
      className={`${types[typeName]} text-2xl border border-transparent rounded-xl px-4 py-2 font-semibold text-center justify-center hover:cursor-pointer hover:drop-shadow-lg/50`}
      {...rest}
    >
      {children}
    </button>
  );
}
