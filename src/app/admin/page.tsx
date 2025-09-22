import { redirect } from "next/navigation";
import { SearchUsers } from "./SearchUsers";
import { clerkClient } from "@clerk/nextjs/server";
import { removeRole, setRole } from "./_actions";
import { checkRole } from "@/lib/roles";

export default async function AdminDashboard(params: {
  searchParams: Promise<{ search?: string }>;
}) {
  if (!checkRole("admin")) {
    redirect("/");
  }

  const query = (await params.searchParams).search;

  const client = await clerkClient();

  const users = query ? (await client.users.getUserList({ query })).data : [];

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      <p className="mb-6 text-gray-600">
        This is the protected admin dashboard restricted to users with the
        `admin` role.
      </p>

      <SearchUsers />

      {users.length === 0 ? (
        <p className="mt-6 text-gray-500">
          No users found. Try searching above.
        </p>
      ) : (
        <div className="mt-6 grid gap-4">
          {users.map((user) => {
            const email = user.emailAddresses.find(
              (email) => email.id === user.primaryEmailAddressId
            )?.emailAddress;

            return (
              <div
                key={user.id}
                className="border border-gray-200 rounded-lg p-4 shadow-sm bg-white"
              >
                <div className="font-semibold text-lg">
                  {user.firstName} {user.lastName}
                </div>
                <div className="text-gray-600">{email}</div>
                <div className="text-sm text-gray-500 mt-1">
                  Current role: {(user.publicMetadata.role as string) || "None"}
                </div>

                <div className="mt-4 flex gap-2">
                  <form action={setRole}>
                    <input type="hidden" value={user.id} name="id" />
                    <input type="hidden" value="admin" name="role" />
                    <button
                      type="submit"
                      className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                    >
                      Make Admin
                    </button>
                  </form>

                  <form action={setRole}>
                    <input type="hidden" value={user.id} name="id" />
                    <input type="hidden" value="moderator" name="role" />
                    <button
                      type="submit"
                      className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
                    >
                      Make Moderator
                    </button>
                  </form>

                  <form action={removeRole}>
                    <input type="hidden" value={user.id} name="id" />
                    <button
                      type="submit"
                      className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                    >
                      Remove Role
                    </button>
                  </form>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
