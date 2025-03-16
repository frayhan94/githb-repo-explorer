export type User = {
  id: string;
  login: string;
  avatar_url: string;
};

export type Repo = {
  id: string;
  name: string;
  full_name: string;
  description: string;
  watchers_count: number;
  forks_count: number;
};
