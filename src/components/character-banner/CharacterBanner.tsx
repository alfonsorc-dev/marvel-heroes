import useGetFavorites from "@/hooks/useGetFavorites";
import { FavoriteButton } from "../favorite-button/FavoriteButton";
import "./CharacterBanner.scss";
import type { Character } from "@/models/Character";
import { useMemo } from "react";

export const CharacterBanner = ({
  id,
  name,
  description,
  thumbnail,
}: Character) => {
  const { favorites, addFavorite, removeFavorite } = useGetFavorites();
  const imageUrl = thumbnail
    ? `${thumbnail.path.replace(/^http:/, "https:")}.${thumbnail.extension}`
    : "";

  const isFavorite = useMemo(
    () => !!favorites?.find((fav: Character) => fav.id === id),
    [favorites, id]
  );

  const handleFavoriteToggle = useMemo(() => {
    return isFavorite
      ? () => removeFavorite(id)
      : () => addFavorite({ id, name, description, thumbnail });
  }, [
    isFavorite,
    addFavorite,
    removeFavorite,
    id,
    name,
    description,
    thumbnail,
  ]);

  return (
    <div className="character-banner">
      <div className="container">
        <img src={imageUrl} alt={name} className="character-banner__image" />
        <div className="character-banner__info">
          <div className="header">
            <h1>{name}</h1>
            <FavoriteButton
              style={isFavorite ? "filled" : "outlined"}
              size={{ height: 24, width: 24 }}
              onClick={handleFavoriteToggle}
            />
          </div>
          <p className="description">{description}</p>
        </div>
      </div>
    </div>
  );
};
