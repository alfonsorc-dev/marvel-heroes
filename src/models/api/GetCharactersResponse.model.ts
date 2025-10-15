export interface MarvelCharacterResponse {
  code: number;
  status: string;
  copyright: string;
  attributionText: string;
  attributionHTML: string;
  etag: string;
  data: CharactersData;
}

export interface CharactersData {
  offset: number;
  limit: number;
  total: number;
  count: number;
  results: APICharacter[];
}

export interface APICharacter {
  id: number;
  name: string;
  description: string;
  modified: string;
  thumbnail: APIImage;
  resourceURI: string;
  comics: ComicList;
  series: SeriesList;
  stories: StoryList;
  events: EventList;
  urls: Url[];
}

export interface APIImage {
  path: string;
  extension: string;
}

export interface ComicList {
  available: number;
  collectionURI: string;
  items: ComicSummary[];
  returned: number;
}

export interface ComicSummary {
  resourceURI: string;
  name: string;
}

export interface SeriesList {
  available: number;
  collectionURI: string;
  items: SeriesSummary[];
  returned: number;
}

export interface SeriesSummary {
  resourceURI: string;
  name: string;
}

export interface StoryList {
  available: number;
  collectionURI: string;
  items: StorySummary[];
  returned: number;
}

export interface StorySummary {
  resourceURI: string;
  name: string;
  type: string;
}

export interface EventList {
  available: number;
  collectionURI: string;
  items: EventSummary[];
  returned: number;
}

export interface EventSummary {
  resourceURI: string;
  name: string;
}

export interface Url {
  type: string;
  url: string;
}
