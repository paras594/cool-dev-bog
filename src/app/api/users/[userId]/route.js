import { connectToDb } from "@/lib/connectToDb";
import { User } from "@/lib/models";
import { NextResponse } from "next/server";

export const GET = async (request, { params }) => {
  const { userId } = params;

  try {
    connectToDb();

    const user = await User.findById(userId).lean();

    return NextResponse.json(user);
  } catch (error) {
    console.log({ error });
    throw new Error("Failed to fetch user");
  }
};
