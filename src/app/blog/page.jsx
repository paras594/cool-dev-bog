import BlogsCarousel from "@/components/blogsCarousel/blogsCarousel";
import Container from "@/components/container/Container";
import { getPosts } from "@/lib/data";
import Image from "next/image";
import PostCard from "./postCard/PostCard";

// fetch data from api/blog route in next.js
const getData = async () => {
  const res = await fetch("http://localhost:3000/api/blog");
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
};

export const metadata = {
  title: "Blogs",
  description: "Read articles about web development, tech, and more.",
};

const BlogPage = async () => {
  // FETCH POST USING API ROUTE IN NEXT.JS
  const posts = await getData();
  // FETCH POSTS WITHOUT AN API
  // const posts = await getPosts();

  return (
    <Container>
      <section style={{ position: "relative", zIndex: 1 }}>
        <BlogsCarousel />
      </section>

      <div className="h-14 md:h-20 lg:h-24" />
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {posts.map((post) => (
          <PostCard post={post} key={post._id} />
        ))}
      </section>
      <div className="h-24" />
    </Container>
  );
};

export default BlogPage;
