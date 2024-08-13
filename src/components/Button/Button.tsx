import React from "react";

type ButtonProps = {
  type?: "button" | "submit" | "reset";
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  style?: React.CSSProperties;
  children?: React.ReactNode;
};
export default function Button({
  type = "button",
  className,
  onClick,
  disabled = false,
  style,
  children,
}: ButtonProps) {
  return (
    <button
      type={type}
      className={className}
      onClick={onClick}
      disabled={disabled}
      style={{
        padding: "10px 20px",
        fontSize: "16px",
        cursor: disabled ? "not-allowed" : "pointer",
        ...style,
      }}
    >
      {children}
    </button>
  );
}
