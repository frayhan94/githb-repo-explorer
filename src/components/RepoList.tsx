"use client";
import { Repo } from "@/types";
import { useGithubRepos } from "@/hooks/useGithubRepos";
import { useSearchStore } from "@/store/searchStore";
import { motion } from "framer-motion";

function RepoList() {
  const { selectedUserName, setShowModalRepoList, pageRepoList, setPageRepoList } =
    useSearchStore();
  const { data: repos, isLoading, error } = useGithubRepos(selectedUserName, pageRepoList);
  if (!selectedUserName) return null;
  if (isLoading) return <p>Loading repositories...</p>;
  if (error) return <p>Error fetching repositories...</p>;
  if (!repos || repos.length === 0) return <p>No repositories found</p>;
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 flex  justify-center  bg-gray-50	 bg-opacity-50 z-50"
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="bg-white w-full max-w-3xl p-6 rounded-lg shadow-lg relative  overflow-y-auto"
      >
        <div className={"bg-white sticky top-[-24px] z-50"}>
          <button
            onClick={() => setShowModalRepoList(false)}
            className="absolute top-3 right-3 text-gray-600 hover:text-gray-900 text-xl cursor-pointer"
          >
            ✖
          </button>
          <h2 className="text-3xl font-bold mb-4 text-center">
            Repositories for {selectedUserName}
          </h2>
        </div>
        <ul>
          {repos?.map((repo: Repo) => (
            <motion.li
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              key={repo.id}
              className="bg-gray-300 p-2 mb-2 rounded-md text-gray-700	 cursor-pointer"
              onClick={() =>
                window.open(`https://github.com/${repo.full_name.toString()}`, "_blank")
              }
            >
              <div className={"text-xl font-semibold"}>
                Title:
                <a target={"_blank"}>{repo.name}</a>
              </div>
              <div className={"text-xl font-semibold"}>Description: {repo.description}</div>
              <div className={"text-xl font-semibold"}>Watchers: {repo.watchers_count}</div>
              <div className={"text-xl font-semibold"}>Forks: {repo.forks_count}</div>
            </motion.li>
          ))}
        </ul>
        {!!repos?.length && (
          <div className="flex justify-between mt-4">
            <button
              onClick={() => setPageRepoList((prev) => Math.max(prev - 1, 1))}
              disabled={pageRepoList === 1 || isLoading}
              className={`px-4 py-2 rounded-md ${pageRepoList === 1 ? "bg-gray-300 cursor-not-allowed" : "bg-blue-500 text-white hover:bg-blue-600 cursor-pointer"}`}
            >
              Previous
            </button>
            <span className="text-gray-700 text-xl font-semibold text-2xl">
              Page {pageRepoList}
            </span>
            <button
              onClick={() => setPageRepoList((prev) => prev + 1)}
              disabled={repos?.length === 0 || isLoading}
              className={`px-4 py-2 rounded-md ${repos?.length === 0 ? "bg-gray-300 cursor-not-allowed" : "bg-blue-500 text-white hover:bg-blue-600 cursor-pointer"}`}
            >
              Next
            </button>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}

export default RepoList;
