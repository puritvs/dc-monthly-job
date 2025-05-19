import { connectToMongoDB } from "@/lib/mongodb";
import Accounts from "@/models/Accounts";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  await connectToMongoDB();

  try {
    const result = await Accounts.find();
    return result;
  } catch (error) {
    console.log("error: ", error);
  }

  return NextResponse.json("Success");
}
