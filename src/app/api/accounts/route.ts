import { connectToMongoDB } from "@/lib/mongodb";
import Accounts from "@/models/Accounts";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const connection = await connectToMongoDB();

  try {
    if (connection !== undefined) {
      const res = await Accounts.find({});
      var test = await connection.db?.collection("Accounts").find({});
      console.log("test: ", test);

      return NextResponse.json(res);
    }
  } catch (error) {
    console.log("error: ", error);
  }

  return NextResponse.json("Success");
}
