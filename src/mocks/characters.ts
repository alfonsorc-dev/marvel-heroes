import type { Character } from "@/models/Character";

export const charactersMock: Character[] = [
  {
    id: 1,
    name: "Spider-Man",
    thumbnail: { path: "fake/path", extension: "jpg" },
  },
  {
    id: 2,
    name: "Iron Man",
    thumbnail: { path: "fake/path2", extension: "jpg" },
  },
  {
    id: 3,
    name: "Captain America",
    thumbnail: { path: "fake/path3", extension: "jpg" },
  },
  {
    id: 4,
    name: "Thor",
    thumbnail: { path: "fake/path4", extension: "jpg" },
  },
];
