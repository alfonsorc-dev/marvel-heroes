import "./CharacterCard.scss";
import { FavoriteButton } from "../favorite-button/FavoriteButton";
import CardImage from "../card-image/CardImage";
import type { Character } from "@/models/Character";

export type CharacterCardProps = Pick<Character, "name" | "thumbnail"> & {
  name: string;
  isFavorite?: boolean;
  onFavoriteToggle: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

export const CharacterCard = ({
  name,
  thumbnail,
  isFavorite,
  onFavoriteToggle,
}: CharacterCardProps) => {
  return (
    <div className="character-card">
      <CardImage imageSrc={thumbnail} alt={name} />
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
