import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchGithubRepos = async (username: string) => {
  const { data } = await axios.get(`https://api.github.com/users/${username}/repos`);
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
