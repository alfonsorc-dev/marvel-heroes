import { MARVEL_API_BASE_URL } from "@/constants/api.const";
import type { MarvelCharacterResponse } from "@/models/api/GetCharactersResponse.model";
import { type UseQueryOptions, useQuery } from "@tanstack/react-query";
interface UseMarvelCharactersOptions {
  limit?: number;
  nameStartsWith?: string;
}

export const useGetCharactersFromAPI = (
  { limit, nameStartsWith }: UseMarvelCharactersOptions,
  queryOptions?: Omit<
    UseQueryOptions<MarvelCharacterResponse>,
    "queryKey" | "queryFn"
  >
) => {
  const apiKey = import.meta.env.VITE_API_KEY;

  const query = useQuery({
    queryKey: ["marvel-characters", nameStartsWith, limit],
    queryFn: async (): Promise<MarvelCharacterResponse> => {
      const url = new URL(`${MARVEL_API_BASE_URL}/characters`);
      url.searchParams.append("apikey", apiKey);
      if (nameStartsWith) {
        url.searchParams.append("nameStartsWith", nameStartsWith);
      }
      if (limit) {
        url.searchParams.append("limit", limit.toString());
      }

      const res = await fetch(url.toString());
      if (!res.ok) throw new Error(`Failed to fetch: ${res.statusText}`);
      return res.json();
    },
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    staleTime: 1000 * 60 * 5,
    ...queryOptions,
  });

  return {
    query,
    data: query.data?.data ?? [],
    isLoading: query.isLoading,
  };
};

export default useGetCharactersFromAPI;
