import CreatePostModal from "@/components/createPostModal/CreatePostModal";
import EditPostButton from "@/components/editPostButton/EditPostButton";
import UpdatePostModal from "@/components/updatePostModal/UpdatePostModal";
import { addPost, deletePost, updatePost } from "@/lib/action";
import { auth } from "@/lib/auth";
import { UpdatePostContext } from "@/lib/updatePostContext";
import { formatDate } from "@/lib/utils";
import Image from "next/image";
import React from "react";

const getData = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/blog`, {
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
};

const getUsers = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/users`);
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
};

export const metadata = {
  title: "Posts",
  description: "List of posts",
};

const Posts = async () => {
  const posts = await getData();
  const users = await getUsers();
  const session = await auth();

  return (
    <>
      <div className="flex-1">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Posts List</h2>
          <CreatePostModal
            authors={users}
            addPost={addPost}
            userId={session?.user?.id}
          />
        </div>
        <UpdatePostModal updatePost={updatePost} />
        <div className="grid overflow-y-hidden">
          <table className="table w-full min-w-full">
            <thead>
              <tr>
                <th>Image</th>
                <th>Title</th>
                <th>Author</th>
                <th>Published</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {posts.map((post) => (
                <tr
                  key={post._id}
                  className="hover:bg-neutral-100 cursor-pointer"
                >
                  <td>
                    <div className="relative w-20 h-12 rounded-lg overflow-hidden">
                      <Image src={post.img} alt="Post Image" fill />
                    </div>
                  </td>
                  <td>{post.title}</td>
                  <td>{post.userId}</td>
                  <td className="whitespace-nowrap">
                    {formatDate(post.createdAt)}
                  </td>
                  <td>
                    <div className="flex gap-2 items-center">
                      <EditPostButton postId={post._id} />
                      <form action={deletePost}>
                        <input type="hidden" name="id" value={post._id} />
                        <button
                          type="submit"
                          className="btn btn-sm btn-error text-white"
                        >
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
    </>
  );
};

export default Posts;
