"use client";
import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Link from "next/link";
import Image from "next/image";

const responsive = {
  all: {
    breakpoint: { max: 4000, min: 0 },
    items: 1,
  },
};

const BlogsCarousel = () => {
  const [topPosts, setTopPosts] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const getTopPosts = async () => {
      setLoading(true);
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/blog/top-posts`
      );
      if (!res.ok) {
        throw new Error("Failed to fetch data");
      }

      const data = await res.json();
      setTopPosts(data);
      setLoading(false);
    };

    getTopPosts();
  }, []);

  if (loading) {
    return (
      <div className="border-2 rounded-xl w-full h-52 sm:h-72 md:h-96 lg:h-[500px] flex justify-center items-center">
        <span className="loading loading-infinity loading-lg scale-150"></span>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 overflow-hidden rounded-xl relative ">
      <Carousel
        swipeable={false}
        draggable={false}
        showDots={false}
        responsive={responsive}
        infinite
        ssr
      >
        {topPosts.map((post) => (
          <Link
            href={`/blog/${post.slug}`}
            key={post.id}
            className="relative block w-full h-52 sm:h-72 md:h-96 lg:h-[500px]"
          >
            <Image
              src={post.img}
              alt={post.title}
              fill
              className="object-cover"
            />
          </Link>
        ))}
      </Carousel>
    </div>
  );
};

export default BlogsCarousel;
