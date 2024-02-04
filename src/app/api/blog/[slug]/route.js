import { connectToDb } from "@/lib/connectToDb";
import { Post } from "@/lib/models";
import { NextResponse } from "next/server";

export const GET = async (request, { params }) => {
  const { slug } = params;

  console.log({ slug });

  try {
    connectToDb();

    let post;

    post = await Post.findOne({ slug });

    if (!post) {
      post = await Post.findById(slug);
    }

    console.log({ backendPost: post });

    return NextResponse.json(post);
  } catch (error) {
    console.log({ error });
    throw new Error("Failed to fetch post");
  }
};

export const PUT = async (request, { params }) => {
  const { slug } = params;
  const updates = await request.json();

  try {
    connectToDb();
    const post = await Post.findOneAndUpdate({ slug }, updates, { new: true });

    if (!post) {
      throw new Error("Post not found");
    }

    return NextResponse.json(post);
  } catch (error) {
    console.log({ error });
    throw new Error("Failed to update post");
  }
};

export const DELETE = async (request, { params }) => {
  const { slug } = params;

  try {
    connectToDb();
    const post = await Post.findOneAndDelete({ slug });

    if (!post) {
      throw new Error("Post not found");
    }

    return NextResponse.json({ message: "Post deleted successfully" });
  } catch (error) {
    console.log({ error });
    throw new Error("Failed to delete post");
  }
};

export const POST = async (request) => {
  const data = await request.json();

  try {
    connectToDb();
    const post = new Post(data);
    await post.save();

    return NextResponse.json(post);
  } catch (error) {
    console.log({ error });
    throw new Error("Failed to create post");
  }
};
