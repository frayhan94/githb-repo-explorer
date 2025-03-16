import { useQuery, UseQueryResult } from "@tanstack/react-query";
import axios from "axios";
const GITHUB_ACCESS_TOKEN = process.env.NEXT_PUBLIC_GITHUB_ACCESS_TOKEN;
import { GITHUB_ENDPOINT } from "@/constant";
import { User } from "@/types";

const fetchGithubUsers = async (query: string, page: number, per_page: number): Promise<User[]> => {
  const { data } = await axios.get(`${GITHUB_ENDPOINT}/search/users?q=${query}`, {
    params: { page, per_page },
    headers: {
      Authorization: `Bearer ${GITHUB_ACCESS_TOKEN}`,
      Accept: "application/vnd.github.v3+json",
    },
  });
  return data.items;
};

export function useGithubUsers(
  query: string,
  page: number,
  per_page: number = 10
): UseQueryResult<User[]> {
  return useQuery<User[]>({
    queryKey: ["githubUsers", query, page],
    queryFn: () => fetchGithubUsers(query, page, per_page),
    retry: 3,
    enabled: !!query, // Prevents automatic call when query is empty,
    staleTime: 1000 * 60 * 5, // cache for 5 minutes
  });
}
