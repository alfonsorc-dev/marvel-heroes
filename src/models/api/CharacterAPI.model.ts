import type { APIImage, List, Url } from "@/models/api/CommonAPI.model";

export interface APICharacter {
  id: number;
  name: string;
  description: string;
  modified: string;
  thumbnail: APIImage;
  resourceURI: string;
  comics: List;
  series: List;
  stories: List;
  events: List;
  urls: Url[];
}
