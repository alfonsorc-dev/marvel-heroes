import "./CharacterCard.scss";
import { FavoriteButton } from "../favorite-button/FavoriteButton";
import type { Character } from "@/models/Character";
import { ImageFormat } from "@/enums/image.enum";
import { CardWithSpinner } from "../with-spinner/WithSpinner";

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
      <CardWithSpinner
        renderContent={(isLoading, onLoad) => (
          <>
            <img
              className="character-card__image"
              srcSet={`
              ${thumbnail.path}/${ImageFormat.STANDARD}.${thumbnail.extension} 180w,
              ${thumbnail.path}/${ImageFormat.BIG}.${thumbnail.extension} 200w
          `}
              sizes={`(max-width: 1024px) var(--card-image-width), var(--card-image-width-desktop)`}
              src={`${thumbnail.path}/${ImageFormat.STANDARD}.${thumbnail.extension}`}
              alt={name}
              loading="lazy"
              onLoad={onLoad}
            />
            {!isLoading && (
              <>
                <div className="ruler"></div>
                <div className="character-card__info">
                  <h2 className="character-name">{name}</h2>
                  <FavoriteButton
                    style={isFavorite ? "filled" : "outlined"}
                    onClick={onFavoriteToggle}
                  />
                </div>
              </>
            )}
          </>
        )}
      />
    </div>
  );
};
