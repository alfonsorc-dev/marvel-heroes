export interface APIResponse<T> {
  code: number;
  status: string;
  copyright: string;
  attributionText: string;
  attributionHTML: string;
  etag: string;
  data: T;
}
export interface ResponseData<T> {
  offset: number;
  limit: number;
  total: number;
  count: number;
  results: T;
}

export interface Resource {
  resourceURI: string;
  name: string;
  type?: string;
  role?: string;
}

export interface APIImage {
  path: string;
  extension: string;
}

export interface List<T = Resource> {
  available: number;
  collectionURI: string;
  items: T[];
  returned: number;
}

export interface Url {
  type: string;
  url: string;
}
