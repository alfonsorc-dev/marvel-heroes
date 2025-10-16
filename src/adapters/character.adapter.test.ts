import { apiCharacterToCharacter } from "./character.adapter";

import type { APICharacter } from "@/models/api/GetCharactersResponse.model";
import type { Character } from "@/models/Character";
import { describe, expect, it } from "vitest";

describe("character.adapter", () => {
  describe("apiCharacterToCharacter", () => {
    it("should map APICharacter to Character correctly", () => {
      const apiCharacter: APICharacter = {
        id: 1011334,
        name: "3-D Man",
        description: "",
        modified: "2014-04-29T14:18:17-0400",
        thumbnail: { path: "http://example.com/image", extension: "jpg" },
        resourceURI: "http://gateway.marvel.com/v1/public/characters/1011334",
        comics: {
          available: 12,
          collectionURI:
            "http://gateway.marvel.com/v1/public/characters/1011334/comics",
          items: [],
          returned: 12,
        },
        series: {
          available: 3,
          collectionURI:
            "http://gateway.marvel.com/v1/public/characters/1011334/series",
          items: [],
          returned: 3,
        },
        stories: {
          available: 21,
          collectionURI:
            "http://gateway.marvel.com/v1/public/characters/1011334/stories",
          items: [],
          returned: 20,
        },
        events: {
          available: 1,
          collectionURI:
            "http://gateway.marvel.com/v1/public/characters/1011334/events",
          items: [],
          returned: 1,
        },
        urls: [],
      };

      const expectedCharacter: Character = {
        id: 1011334,
        name: "3-D Man",
        thumbnail: { path: "http://example.com/image", extension: "jpg" },
      };

      const result = apiCharacterToCharacter(apiCharacter);
      expect(result).toStrictEqual(expectedCharacter);
    });
  });
});
