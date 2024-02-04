import BlogAuthor from "@/components/blogAuthor/BlogAuthor";
import Container from "@/components/container/Container";
import { getPost } from "@/lib/data";
import { formatDate } from "@/lib/utils";
import Image from "next/image";
import { Suspense } from "react";
import { HiChevronRight } from "react-icons/hi2";
import PostCard from "../postCard/PostCard";

export const generateMetadata = async ({ params }) => {
  const post = await getPost(params.slug); // only fetches once and then caches for next req.

  return {
    title: post.title,
    description: post.description,
  };
};

// FETCH DATA FROM API ROUTE IN NEXT.JS
const getData = async (slug) => {
  const res = await fetch(`${process.env.BASE_URL}/api/blog/${slug}`);
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
};

const getTopPosts = async () => {
  const res = await fetch(`${process.env.BASE_URL}/api/blog/top-posts`);
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
};

const SinglePostPage = async ({ params, searchParams }) => {
  console.log({ params }); // this catches the slug from url in server side
  console.log({ searchParams }); // this gives search queries
  const { slug } = params;
  // const post = await getPost(slug);
  const post = await getData(slug);
  const topArticles = await getTopPosts();

  console.log({ post });

  return (
    <Container>
      <div className="flex gap-12">
        <div className="flex-1">
          <figure className="relative w-full h-52 sm:h-64 md:h-72 lg:h-80 rounded-xl overflow-hidden">
            <Image
              src={post.img}
              alt={post.title}
              fill
              className="object-cover"
            />
          </figure>

          <div className="mt-6">
            <h1 className="text-2xl md:text-3xl font-semibold">{post.title}</h1>
            <div className="flex items-center gap-2 md:gap-4 mt-4">
              <Suspense
                fallback={
                  <span className="loading loading-spinner loading-xs"></span>
                }
              >
                <BlogAuthor userId={post.userId} />
              </Suspense>
              <div className="ml-4">
                <p className="font-semibold text-gray-400 text-sm">Published</p>
                <p className="font-semibold text-gray-900 text-sm md:text-base">
                  {formatDate(post.createdAt)}
                </p>
              </div>
            </div>
          </div>

          <div className="text-base md:text-lg mt-10">
            <p className="leading-7 md:leading-8 mb-5">{post.desc}</p>
          </div>
        </div>
        <div className="w-72 xl:w-96 hidden lg:block">
          <h2 className="text-2xl font-semibold mb-4">Top Articles</h2>
          <div className="flex flex-col gap-6">
            {topArticles.map((post) => (
              <PostCard key={post._id} post={post} />
            ))}
            {/* <div className="card card-compact basis-36 flex-1 bg-base-100 shadow-md">
              <figure className="relative h-36 xl:h-48 w-full">
                <Image
                  src="https://res.cloudinary.com/dzujgoodl/image/upload/v1704896793/cool-dev-blogs/kbfjqlwrjfquliung1bt.png"
                  alt="Shoes"
                  fill
                  className="object-cover"
                />
              </figure>
              <div className="card-body">
                <h2 className="card-title">
                  Shoes!
                  <div className="badge badge-secondary">NEW</div>
                </h2>
                <p>If a dog chews shoes whose shoes does he choose?</p>
                <div className="card-actions justify-end">
                  <button className="btn btn-neutral btn-sm xl:btn-md">
                    Read Now{" "}
                    <span className="text-base">
                      <HiChevronRight />
                    </span>
                  </button>
                </div>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </Container>
  );
};

export default SinglePostPage;
