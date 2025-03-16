import { useQuery,UseQueryResult } from "@tanstack/react-query";
import axios from "axios";
import { Repo } from "@/types";
const GITHUB_ACCESS_TOKEN = process.env.NEXT_PUBLIC_GITHUB_ACCESS_TOKEN;

const fetchGithubRepos = async (
  username: string,
  page: number,
  per_page: number
): Promise<Repo> => {
  const { data } = await axios.get(`https://api.github.com/users/${username}/repos`, {
    params: { page, per_page },
    headers: {
      Authorization: `Bearer ${GITHUB_ACCESS_TOKEN}`,
      Accept: "application/vnd.github.v3+json",
    },
  });
  return data;
};

export function useGithubRepos(username: string, page: number, per_page = 10): UseQueryResult<Repo[]> {
  return useQuery({
    queryKey: ["githubRepos", username],
    queryFn: () => fetchGithubRepos(username, page, per_page),
    retry: 3,
    enabled: !!username,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}
