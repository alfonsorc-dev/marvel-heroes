import type { Character } from "@/models/Character";

export const sortCharactersByName = (characters: Character[]): Character[] => {
  return [...characters].sort((a, b) => a.name.localeCompare(b.name));
};
