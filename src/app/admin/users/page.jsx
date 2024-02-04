import CreateUserModal from "@/components/createUserModal/CreateUserModal";
import EditPostButton from "@/components/editUserButton/EditUserButton";
import UpdateUserModal from "@/components/updateUserModal/UpdateUserModal";
import { addUser, deleteUser, updateUser } from "@/lib/action";
import { auth } from "@/lib/auth";
import { formatDate } from "@/lib/utils";
import Image from "next/image";
import React from "react";
import { FaCrown } from "react-icons/fa6";

const getData = async () => {
  const res = await fetch(`${process.env.BASE_URL}/api/users`);
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
};

export const metadata = {
  title: "Users",
  description: "List of users",
};

const Users = async () => {
  const users = await getData();
  const session = await auth();

  return (
    <div className="flex-1">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Users List</h2>
        <CreateUserModal addUser={addUser} />
      </div>
      <UpdateUserModal updateUser={updateUser} />
      <div className="grid overflow-y-hidden">
        <table className="table w-full min-w-full">
          <thead>
            <tr>
              <th>Image</th>
              <th>Username</th>
              <th>User ID</th>
              <th>Register Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {/* Replace with actual post data */}
            {users.map((user) => (
              <tr
                key={user._id}
                className="hover:bg-neutral-100 cursor-pointer"
              >
                <td>
                  <div
                    className="avatar relative"
                    title={user.isAdmin && "Admin User"}
                  >
                    <div className="w-10 h-10 md:w-12 md:h-12 rounded-full border-2 relative">
                      <Image
                        src={user.img || "/images/user-placeholder.jpg"}
                        alt="author"
                        fill
                      />
                    </div>
                    {user.isAdmin && (
                      <span className="absolute text-xl text-amber-500 -top-2 right-0">
                        <FaCrown />
                      </span>
                    )}
                  </div>
                </td>
                <td>{user.username}</td>
                <td>{user._id}</td>
                <td className="whitespace-nowrap">
                  {formatDate(user.createdAt)}
                </td>
                <td>
                  <div className="flex gap-2 items-center">
                    <EditPostButton userId={user._id} />
                    <form action={deleteUser}>
                      <input type="hidden" name="id" value={user._id} />
                      <input
                        type="hidden"
                        name="sessionUserId"
                        value={session?.user?.id}
                      />
                      <button className="btn btn-sm btn-error text-white">
                        Delete
                      </button>
                    </form>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Users;
