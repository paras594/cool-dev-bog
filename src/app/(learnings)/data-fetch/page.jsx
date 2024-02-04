import Container from "@/components/container/Container";
import Link from "next/link";
import React, { Suspense } from "react";
import UserComponent from "./userComponent";

const getUsersCached = async () => {
  const res = await fetch("https://jsonplaceholder.typicode.com/users");
  // revalidate after 1hr or any period
  // const res = await fetch("https://jsonplaceholder.typicode.com/users", { next: {revalidate: 3600}});

  if (!res.ok) {
    throw new Error("Something went wrong with getUsersCached");
  }

  return res.json();
};

const getPostsUncached = async () => {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts", {
    cache: "no-cache",
  });

  if (!res.ok) {
    throw new Error("Something went wrong with getUsersCached");
  }

  return res.json();
};

const DataFetching = async () => {
  const users = await getUsersCached();
  const posts = await getPostsUncached();

  return (
    <Container>
      <Link href="/" className="btn">
        Go to home
      </Link>

      <h1 className="mt-6 mb-2 text-2xl font-semibold">
        Single User That Is Using suspense
      </h1>
      <div>
        <Suspense
          fallback={
            <span className="loading loading-spinner loading-xs"></span>
          }
        >
          <UserComponent />
        </Suspense>
      </div>
      <h1 className="mt-6 mb-2 text-2xl font-semibold">
        Users Data (cache enabled)
      </h1>
      <div className="flex gap-2 flex-wrap">
        {users.map((user) => (
          <span key={user.id} className="badge">
            {user.name}
          </span>
        ))}
      </div>
      <h1 className="mt-6 mb-2 text-2xl font-semibold">
        Posts Data (cache disabled)
      </h1>
      <div className="flex gap-2 flex-wrap">
        {posts.slice(0, 10).map((post) => (
          <span key={post.id} className="badge">
            {post.title}
          </span>
        ))}
      </div>
    </Container>
  );
};

export default DataFetching;
