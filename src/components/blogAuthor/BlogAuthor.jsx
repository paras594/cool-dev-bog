import { getUser } from "@/lib/data";
import Image from "next/image";
import React from "react";

const BlogAuthor = async ({ userId }) => {
  const user = await getUser(userId);

  return (
    <div className="flex items-center gap-2 md:gap-4">
      <div className="avatar">
        <div className="w-12 h-12 md:w-14 md:h-14 rounded-full border-2 relative">
          <Image src={user.img} alt="author" fill />
        </div>
      </div>
      <div>
        <p className="font-semibold text-gray-400 text-sm">Author</p>
        <p className="font-semibold text-gray-900 text-sm md:text-base">
          {user.username}
        </p>
      </div>
    </div>
  );
};

export default BlogAuthor;
