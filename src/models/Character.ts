import type { APICharacter } from "./api/GetCharactersResponse.model";

export type Character = Pick<APICharacter, "id" | "name" | "thumbnail">;
