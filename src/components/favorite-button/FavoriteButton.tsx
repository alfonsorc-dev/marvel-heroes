import "./FavoriteButton.scss";
import filledHeart from "@/assets/filled-heart.svg";
import outlinedHeart from "@/assets/outlined-heart.svg";
import React, { useMemo } from "react";

export type FavoriteButtonProps = {
  style: "filled" | "outlined";
  size?: {
    height: number;
    width: number;
  };
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

export const FavoriteButton = ({
  style,
  onClick,
  size,
}: FavoriteButtonProps) => {
  const imageUrl = useMemo(() => {
    return style === "filled" ? filledHeart : outlinedHeart;
  }, [style]);

  return (
    <button className="unstyled-button" onClick={onClick}>
      <img
        src={imageUrl}
        height={size?.height ? size.height : undefined}
        width={size?.width ? size.width : undefined}
        alt={style === "filled" ? "Filled Heart Icon" : "Outlined Heart icon"}
      />
    </button>
  );
};
