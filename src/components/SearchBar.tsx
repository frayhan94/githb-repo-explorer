"use client";
import { useGithubUsers } from "@/hooks/useGithubUsers";
import { User } from "@/types";
import { motion } from "framer-motion";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useSearchStore } from "@/store/searchStore";
import { searchSchema, SearchSchemaType } from "@/schemas/searchSchema";

function SearchBar() {
  const { query, setQuery, setSelectedUserName, setShowModalRepoList, page, setPage } =
    useSearchStore();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SearchSchemaType>({
    resolver: zodResolver(searchSchema),
    defaultValues: { query },
  });

  const onSubmit = (data: { query: string }) => {
    setQuery(data.query);
  };
  const { data: users, isLoading, error } = useGithubUsers(query, page);

  const handleSelectUser = (user: User) => {
    setSelectedUserName(user.login);
    setShowModalRepoList(true);
  };
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="w-full"
    >
      <form className={"space-y-4"} onSubmit={handleSubmit(onSubmit)}>
        <div className={"flex flex-col "}>
          <div className={"flex flex-col items-center"}>
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
              className={"flex flex-row gap-4"}
            >
              <div>
                <input
                  {...register("query")}
                  placeholder={"Search Github Users..."}
                  className={
                    "px-4 py-2 text-gray-600 focus:outline-none  border border-2 cursor-pointer rounded-md sm:w-96"
                  }
                />
              </div>
              <div>
                <motion.button
                  id={"search-button"}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.0 }}
                  className={
                    "bg-blue-500 text-white px-4 py-2 hover:bg-blue-600 transition duration-200 rounded-md cursor-pointer"
                  }
                  type="submit"
                >
                  Search
                </motion.button>
              </div>
            </motion.div>
            <div className={"mt-2"}>
              {errors.query && (
                <p className={"text-red-500 text-xl font-bold"}>{errors.query.message}</p>
              )}
            </div>
            {isLoading && <p className={"text-gray-600 text-base font-bold"}>Loading...</p>}
            {error && <p className={"text-red-500 text-sm"}>Error fetching users</p>}
          </div>
          <div className={" pt-3.5"}>
            {users?.length ? (
              <motion.ul
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className={"p-2  overflow-auto space-y-2 bg-gray-100 p-2.5"}
              >
                {users.map((user: User) => (
                  <motion.li
                    className={
                      "p-2 bg-white hover:bg-gray-200 cursor-pointer rounder-md shadow-md transition duration-200 text-2xl h-28 mb-2 rounded-lg"
                    }
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * users.indexOf(user), duration: 0.3 }}
                    onClick={() => handleSelectUser(user)}
                    key={user.id}
                  >
                    <span>{user.login}</span>
                    {user.avatar_url !== "" &&
                      user.avatar_url !== null &&
                      user.avatar_url !== undefined && (
                        <span className={"mt-2"}>
                          <Image
                            width={50}
                            height={50}
                            src={user.avatar_url}
                            alt={user.avatar_url}
                          />
                        </span>
                      )}
                  </motion.li>
                ))}
              </motion.ul>
            ) : (
              <>
                {query !== "" && !isLoading && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className={"text-gray-600 text-xl font-bold text-center"}
                  >
                    No users found
                  </motion.p>
                )}
              </>
            )}
          </div>

          {!!users?.length && (
            <div className="flex justify-between mt-4">
              <button
                onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                disabled={page === 1 || isLoading}
                className={`px-4 py-2 rounded-md ${page === 1 ? "bg-gray-300 cursor-not-allowed" : "bg-blue-500 text-white hover:bg-blue-600 cursor-pointer"}`}
              >
                Previous
              </button>
              <span className="text-gray-700">Page {page}</span>
              <button
                onClick={() => setPage((prev) => prev + 1)}
                disabled={users?.length === 0 || isLoading}
                className={`px-4 py-2 rounded-md ${users?.length === 0 ? "bg-gray-300 cursor-not-allowed" : "bg-blue-500 text-white hover:bg-blue-600 cursor-pointer"}`}
              >
                Next
              </button>
            </div>
          )}
        </div>
      </form>
    </motion.div>
  );
}

export default SearchBar;
