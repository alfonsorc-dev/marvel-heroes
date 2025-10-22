import type { APICharacter } from "@/models/api/CharacterAPI.model";

export type Character = Pick<APICharacter, "id" | "name" | "thumbnail"> & {
  description?: string;
};
