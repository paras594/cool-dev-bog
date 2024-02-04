import { connectToDb } from "@/lib/connectToDb";
import { Post } from "@/lib/models";
import { NextResponse } from "next/server";

export const GET = async (request) => {
  console.log("getting top posts");
  try {
    connectToDb();
    const posts = await Post.find().limit(3);

    return NextResponse.json(posts);
  } catch (error) {
    console.log({ error });
    throw new Error("failed to get posts");
  }
};
