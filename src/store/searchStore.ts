import { create } from "zustand";
interface SearchState {
  query: string;
  setQuery: (query: string) => void;
  selectedUserName: string;
  setSelectedUserName: (selectedUserName: string) => void;
  showModalRepoList: boolean;
  setShowModalRepoList: (value: boolean) => void;
  page: number;
  setPage: (page: number | ((prev: number) => number)) => void;
  pageRepoList: number;
  setPageRepoList: (pageRepoList: number | ((prev: number) => number)) => void;
}

export const useSearchStore = create<SearchState>((set) => ({
  query: "",
  setQuery: (query) => set({ query }),
  selectedUserName: "",
  setSelectedUserName: (selectedUserName) => set({ selectedUserName }),
  showModalRepoList: false,
  setShowModalRepoList: (showModalRepoList) => set({ showModalRepoList }),
  page: 1,
  setPage: (page) =>
    set((state) => ({
      page: typeof page === "function" ? page(state.page) : page,
    })),
  pageRepoList: 1,
  setPageRepoList: (pageRepoList) =>
    set((state) => ({
      pageRepoList:
        typeof pageRepoList === "function" ? pageRepoList(state.pageRepoList) : pageRepoList,
    })),
}));
