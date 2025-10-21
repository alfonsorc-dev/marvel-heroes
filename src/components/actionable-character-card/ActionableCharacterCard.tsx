import { CharacterCard } from "@/components/character-card/CharacterCard";
import type { Character } from "@/models/Character";
import { useMemo } from "react";
import { Link } from "react-router-dom";
import "./ActionableCharacterCard.scss";
import useFavorites from "@/hooks/useGetFavorites";

export type ActionableCharacterCardProps = {
  character: Character;
};

export const ActionableCharacterCard = ({
  character,
}: ActionableCharacterCardProps) => {
  const { favorites, addFavorite, removeFavorite } = useFavorites();

  const isFavorite = useMemo(
    () => !!favorites?.find((fav: Character) => fav.id === character.id),
    [favorites, character.id]
  );

  const handleFavoriteToggle = (character: Character, isFavorite: boolean) => {
    return isFavorite ? removeFavorite(character.id) : addFavorite(character);
  };

  return (
    <div className="actionable-character-card">
      <Link to={`/details/${character.id}`}>
        <CharacterCard
          key={character.id}
          name={character.name}
          thumbnail={character.thumbnail}
          isFavorite={isFavorite}
          onFavoriteToggle={(e) => {
            e.preventDefault();
            handleFavoriteToggle(character, isFavorite);
          }}
        />
      </Link>
    </div>
  );
};
