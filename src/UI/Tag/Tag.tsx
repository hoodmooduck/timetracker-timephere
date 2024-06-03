import "./Tag.scss";
import { colors } from "./Colors.ts";
import React from "react";

interface TagProps {
  id: number;
  text: string;
  className?: string;
}

const Tag: React.FC<TagProps> = ({ id, text, className }: TagProps) => {
  const generateBackColor = (idx: number) => colors[idx];

  return (
    <span
      style={{ background: generateBackColor(id) }}
      className={`tag ${className}`}
    >{`#${text}`}</span>
  );
};

export default Tag;
