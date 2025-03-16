import { create } from "zustand";
interface SearchState {
  query: string;
  setQuery: (query: string) => void;
  selectedUserName: string;
  setSelectedUserName: (selectedUserName: string) => void;
  showModalRepoList: boolean;
  setShowModalRepoList: (value: boolean) => void;
}

export const useSearchStore = create<SearchState>((set) => ({
  query: "",
  setQuery: (query) => set({ query }),
  selectedUserName: "",
  setSelectedUserName: (selectedUserName) => set({ selectedUserName }),
  showModalRepoList: false,
  setShowModalRepoList: (showModalRepoList) => set({ showModalRepoList }),
}));
