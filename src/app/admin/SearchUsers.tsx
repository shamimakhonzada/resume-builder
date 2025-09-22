"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

export const SearchUsers = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  return (
    <div className="flex flex-col gap-2">
      <form
        className="flex items-center gap-2"
        onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.currentTarget);
          const queryTerm = (formData.get("search") as string).trim();
          if (!queryTerm) return;
          const params = new URLSearchParams(searchParams.toString());
          params.set("search", queryTerm);
          router.push(`${pathname}?${params.toString()}`);
        }}
      >
        <label htmlFor="search" className="sr-only">
          Search for users
        </label>
        <input
          id="search"
          name="search"
          type="text"
          placeholder="Search for users..."
          className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          Search
        </button>
      </form>
    </div>
  );
};
