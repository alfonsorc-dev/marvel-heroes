import type { APICharacter } from "@/models/api/CharacterAPI.model";
import type { Character } from "@/models/Character";

export const apiCharacterToCharacter = (
  apiCharacter: APICharacter
): Character => {
  const imagePath = apiCharacter.thumbnail.path.replace(/^http:/, "https:");
  const extension = apiCharacter.thumbnail.extension;

  return {
    id: apiCharacter.id,
    name: apiCharacter.name,
    thumbnail: {
      path: imagePath,
      extension,
    },
  };
};
