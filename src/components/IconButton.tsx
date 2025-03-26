import React from "react";

import { IconButtonProps } from "@/interfaces";

const IconButton: React.FC<IconButtonProps> = ({ iconClass, onClick }) => {
  return (
    <button onClick={onClick} className="icon-button icon-button-circle">
      <i className={iconClass} style={{ color: "var(--secondary-teal)" }}></i>
    </button>
  );
};

export default IconButton;
