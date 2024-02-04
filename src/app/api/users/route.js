import { connectToDb } from "@/lib/connectToDb";
import { User } from "@/lib/models";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    connectToDb();
    const users = await User.find();

    return NextResponse.json(users);
  } catch (error) {
    console.log({ error });
    throw new Error("failed to get users");
  }
};
