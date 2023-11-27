// ActionButton.tsx
import React, { ReactNode } from "react";

interface ActionButtonProps {
  onClick: () => void;
  label: string;
  bgColor: string;
  textColor: string;
}

const ActionButton: React.FC<ActionButtonProps> = ({
  onClick,
  label,
  bgColor,
  textColor,
}) => {
  return (
    <button
      onClick={onClick}
      className={`${bgColor} text-${textColor} hover:bg-indigo-600 text-xs font-bold px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150`}
    >
      {label}
    </button>
  );
};

export default ActionButton;
