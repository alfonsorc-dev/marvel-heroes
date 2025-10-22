import { MARVEL_API_BASE_URL } from "@/constants/api.const";
import type { APICharacter } from "@/models/api/CharacterAPI.model";
import type { APIResponse, ResponseData } from "@/models/api/CommonAPI.model";
import { type UseQueryOptions, useQuery } from "@tanstack/react-query";

export const useGetCharacterById = (
  characterId: string,
  queryOptions?: Omit<
    UseQueryOptions<APIResponse<ResponseData<APICharacter[]>>>,
    "queryKey" | "queryFn"
  >
) => {
  const apiKey = import.meta.env.VITE_MARVEL_API_KEY;

  const query = useQuery({
    queryKey: ["marvel-character", characterId],
    queryFn: async (): Promise<APIResponse<ResponseData<APICharacter[]>>> => {
      const url = new URL(`${MARVEL_API_BASE_URL}/characters/${characterId}`);
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
    data: query.data?.data ?? [],
    isLoading: query.isLoading,
  };
};

export default useGetCharacterById;
