import { useParams } from "react-router-dom";
import "./Details.scss";
import { useGetCharacterById } from "@/hooks/api/useGetCharacterById";
import { CharacterBanner } from "@/components/character-banner/CharacterBanner";

export default function Details() {
  const { id } = useParams();
  const { data } = useGetCharacterById(id ?? "");

  const character =
    data && "results" in data && data.results.length > 0
      ? data.results[0]
      : null;

  if (!character) return <div>No character found</div>;

  return (
    <div className="details">
      <div className="details__fixed-content">
        <CharacterBanner
          id={character.id}
          name={character.name}
          description={character.description}
          thumbnail={character.thumbnail}
        />
      </div>
    </div>
  );
}
