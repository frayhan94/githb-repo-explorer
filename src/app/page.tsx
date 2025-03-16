"use client";
import SearchBar from "@/components/SearchBar";
import RepoList from "@/components/RepoList";
import { NextSeo } from "next-seo";
import { useSearchStore } from "@/store/searchStore";
import { useEffect } from "react";

export default function Home() {
  const showModalRepoList = useSearchStore((state) => state.showModalRepoList);
  const setShowModalRepoList = useSearchStore((state) => state.setShowModalRepoList);

  useEffect(() => {
    const handleKeydown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setShowModalRepoList(false);
      }
    };
    if (showModalRepoList) {
      document.body.classList.add("no-scroll");
      document.addEventListener("keydown", handleKeydown);
    } else {
      document.body.classList.remove("no-scroll");
    }
    return () => {
      document.body.classList.remove("no-scroll");
      document.addEventListener("keydown", handleKeydown);
      document.removeEventListener("keydown", handleKeydown);
    };
  }, [showModalRepoList]);
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-start py-10 px-4">
      <h1 className={"text-2xl sm:text-3xl  text-gray-900 mb-6 text-centered"}>
        Github Repository Explorer
      </h1>
      <SearchBar />
      {/*modal repository list*/}
      {showModalRepoList && <RepoList />}
    </div>
  );
}
