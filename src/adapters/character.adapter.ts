import type { APICharacter } from "@/models/api/GetCharactersResponse.model";
import type { Character } from "@/models/Character";

export const apiCharacterToCharacter = (
  apiCharacter: APICharacter
): Character => ({
  id: apiCharacter.id,
  name: apiCharacter.name,
  thumbnail: apiCharacter.thumbnail,
});
