import Image from "next/image";
import Link from "next/link";
import { HiChevronRight } from "react-icons/hi2";

const PostCard = ({ post }) => {
  return (
    <div className="card card-compact xl:card-normal basis-36 flex-1 bg-base-100 shadow-md">
      <figure className="relative h-40 md:h-52 w-full">
        <Image src={post.img} alt={post.title} fill className="object-cover" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">
          <div>
            {post.title}
            {Math.random() > 0.5 && (
              <span className="inline-block ml-2 badge badge-secondary">
                NEW
              </span>
            )}
          </div>
        </h2>
        <p>{post.desc}</p>
        <div className="card-actions justify-end mt-4">
          <Link
            href={`/blog/${post.slug}`}
            className="btn btn-neutral btn-sm md:btn-md"
          >
            Read Now{" "}
            <span className="text-base">
              <HiChevronRight />
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
