import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchGithubUsers = async (query: string) => {
  const { data } = await axios.get(`https://api.github.com/search/users?q=${query}`);
  return data.items;
};

export function useGithubUsers(query: string) {
  return useQuery({
    queryKey: ["githubUsers", query],
    queryFn: () => fetchGithubUsers(query),
    retry: 3,
    enabled: !!query, // Prevents automatic call when query is empty,
    staleTime: 1000 * 60 * 5, // cache for 5 minutes
  });
}
