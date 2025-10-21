import "./CharacterCard.scss";
import { ImageFormat } from "@/enums/image.enum";
import { FavoriteButton } from "../favorite-button/FavoriteButton";

export type CharacterCardProps = {
  name: string;
  thumbnail: { path: string; extension: string };
  isFavorite?: boolean;
  onFavoriteToggle: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

export const CharacterCard = ({
  name,
  thumbnail,
  isFavorite,
  onFavoriteToggle,
}: CharacterCardProps) => {
  const path = thumbnail.path.replace(/^http:/, "https:");
  return (
    <div className="character-card">
      <img
        className="character-card__image"
        srcSet={`
            ${path}/${ImageFormat.CARD_IMAGE_STANDARD}.${thumbnail.extension} 180w,
            ${path}/${ImageFormat.CARD_IMAGE_BIG}.${thumbnail.extension} 1200w
        `}
        sizes={`(max-width: 1024px) var(--card-image-width), var(--card-image-width-desktop)`}
        src={`${path}/${ImageFormat.CARD_IMAGE_STANDARD}.${thumbnail.extension}`}
        alt={name}
      />
      <div className="ruler"></div>
      <div className="character-card__info">
        <h2 className="character-name">{name.toUpperCase()}</h2>
        <FavoriteButton
          style={isFavorite ? "filled" : "outlined"}
          onClick={onFavoriteToggle}
        />
      </div>
    </div>
  );
};
