import { useParams } from "react-router-dom";
import { Literals } from "@/constants/literals.enum";
import "./Details.scss";
import { useGetCharacterById } from "@/hooks/api/useGetCharacterById";
import { CharacterBanner } from "@/components/character-banner/CharacterBanner";
import useGetCharacterComics from "@/hooks/api/useGetCharacterComics";
import { useMemo } from "react";
import { apiCharacterToCharacter } from "@/adapters/character.adapter";
import { ComicCard } from "@/components/comic-card/ComicCard";

export default function Details() {
  const { id } = useParams();
  const { data } = useGetCharacterById(id ?? "");

  const { data: comics, isLoading } = useGetCharacterComics(id ?? "");

  const character = useMemo(
    () =>
      data && "results" in data && data.results.length > 0
        ? apiCharacterToCharacter(data.results[0])
        : null,
    [data]
  );

  if (!character) return <div>No character found</div>; // TODO: add styles
  if (isLoading) return <div>Loading comics...</div>; // TODO: add loader

  return (
    <div className="details">
      <div className="details__banner">
        <div className="container">
          <CharacterBanner
            id={character.id}
            name={character.name}
            description={character.description}
            thumbnail={character.thumbnail}
          />
        </div>
      </div>
      <div className="details__content">
        <h2>{Literals.Comics}</h2>
        <div className="carousel">
          {comics?.results.map((comic) => (
            <ComicCard
              key={comic.id}
              title={comic.title}
              dates={comic.dates}
              thumbnail={comic.thumbnail}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
