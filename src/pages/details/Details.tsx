import { useParams } from "react-router-dom";
import { Literals } from "@/constants/literals.enum";
import "./Details.scss";
import { useGetCharacterById } from "@/hooks/api/useGetCharacterById";
import { CharacterBanner } from "@/components/character-banner/CharacterBanner";
import useGetCharacterComics from "@/hooks/api/useGetCharacterComics";
import { useMemo } from "react";
import { apiCharacterToCharacter } from "@/adapters/character.adapter";
import { ComicCard } from "@/components/comic-card/ComicCard";
import { Loading } from "../loading/Loading";

export default function Details() {
  const { id } = useParams();
  const { data, isLoading: isLoadingCharacter } = useGetCharacterById(id ?? "");

  const { data: comics, isLoading: isLoadingComics } = useGetCharacterComics(
    id ?? ""
  );

  const character = useMemo(
    () =>
      data && "results" in data && data.results.length > 0
        ? apiCharacterToCharacter(data.results[0])
        : null,
    [data]
  );

  if (isLoadingCharacter || isLoadingComics)
    return <Loading message={Literals.LoadingHeroes} />;

  if (!character)
    return <div className="details__error">Character not found.</div>;

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
        <div
          className={`carousel ${isLoadingComics ? "carousel--loading" : ""}`}
        >
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
