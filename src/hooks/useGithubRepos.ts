import { useQuery } from "@tanstack/react-query";
import axios from "axios";
const GITHUB_ACCESS_TOKEN = process.env.NEXT_PUBLIC_GITHUB_ACCESS_TOKEN;

const fetchGithubRepos = async (username: string) => {
  const { data } = await axios.get(`https://api.github.com/users/${username}/repos`, {
    headers: {
      Authorization: `Bearer ${GITHUB_ACCESS_TOKEN}`,
      Accept: "application/vnd.github.v3+json",
    },
  });
  return data;
};

export function useGithubRepos(username: string) {
  return useQuery({
    queryKey: ["githubRepos", username],
    queryFn: () => fetchGithubRepos(username),
    retry: 3,
    enabled: !!username,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}
