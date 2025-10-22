import { MARVEL_API_BASE_URL } from "@/constants/api.const";
import type { Comic } from "@/models/api/ComicAPI.model";
import type { APIResponse, ResponseData } from "@/models/api/CommonAPI.model";
import { type UseQueryOptions, useQuery } from "@tanstack/react-query";

export const useGetCharacterComics = (
  characterId: string,
  queryOptions?: Omit<
    UseQueryOptions<APIResponse<ResponseData<Comic[]>>>,
    "queryKey" | "queryFn"
  >
) => {
  const apiKey = import.meta.env.VITE_MARVEL_API_KEY;

  const query = useQuery({
    queryKey: ["marvel-character-comics", characterId],
    queryFn: async (): Promise<APIResponse<ResponseData<Comic[]>>> => {
      const url = new URL(
        `${MARVEL_API_BASE_URL}/characters/${characterId}/comics`
      );
      url.searchParams.append("apikey", apiKey);

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
    data: query.data?.data,
    isLoading: query.isLoading,
  };
};

export default useGetCharacterComics;
