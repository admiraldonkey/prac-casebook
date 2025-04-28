import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  typeName: "normal" | "submit" | "delete";
  children: React.ReactNode;
}

// Reusable button compponent which accepts a prop to adjust its styling as desired
export default function Button(props: ButtonProps) {
  const { typeName, children, ...rest } = props;
  // Alternative TailwindCSS styling classes
  const types = {
    normal:
      "bg-govgreen text-white hover:bg-govbluehover hover:drop-shadow-govblue",
    submit:
      "bg-govbluebutton text-white hover:bg-govbuttonhover hover:text-govblack",
    delete: "bg-darkred text-white hover:bg-brightred",
  };
  return (
    <button
      className={`${types[typeName]} text-2xl border border-transparent rounded-xl px-4 py-2 font-medium text-center justify-center hover:cursor-pointer hover:drop-shadow-lg/50`}
      {...rest}
    >
      {children}
    </button>
  );
}
