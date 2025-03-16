import { useQuery, UseQueryResult } from "@tanstack/react-query";
import axios from "axios";
const GITHUB_ACCESS_TOKEN = process.env.NEXT_PUBLIC_GITHUB_ACCESS_TOKEN;
import { GITHUB_ENDPOINT } from "@/constant";
import { User } from "@/types";

const fetchGithubUsers = async (query: string): Promise<User[]> => {
  const { data } = await axios.get(`${GITHUB_ENDPOINT}/search/users?q=${query}`, {
    headers: {
      Authorization: `Bearer ${GITHUB_ACCESS_TOKEN}`,
      Accept: "application/vnd.github.v3+json",
    },
  });
  return data.items;
};

export function useGithubUsers(query: string): UseQueryResult<User[]> {
  return useQuery<User[]>({
    queryKey: ["githubUsers", query],
    queryFn: () => fetchGithubUsers(query),
    retry: 3,
    enabled: !!query, // Prevents automatic call when query is empty,
    staleTime: 1000 * 60 * 5, // cache for 5 minutes
  });
}
