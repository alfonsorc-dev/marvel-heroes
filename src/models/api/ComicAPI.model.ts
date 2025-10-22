import type {
  APIImage,
  List,
  Resource,
  Url,
} from "@/models/api/CommonAPI.model";

interface ComicDate {
  type: string;
  date: string;
}

interface ComicPrice {
  type: string;
  price: number;
}

export interface Comic {
  id: number;
  digitalId: number;
  title: string;
  issueNumber: number;
  variantDescription: string;
  description: string;
  modified: string;
  isbn: string;
  upc: string;
  diamondCode: string;
  ean: string;
  issn: string;
  format: string;
  pageCount: number;
  textObjects: {
    type: string;
    language: string;
    text: string;
  }[];
  resourceURI: string;
  urls: Url[];
  series: Resource;
  variants: Resource[];
  collections: unknown[];
  collectedIssues: unknown[];
  dates: ComicDate[];
  prices: ComicPrice[];
  thumbnail: APIImage;
  images: APIImage[];
  creators: List<Resource>;
  characters: List<Resource>;
  stories: List<Resource>;
  events: List<Resource>;
}
