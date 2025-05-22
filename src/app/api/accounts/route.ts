import { connectToMongoDB } from "@/lib/mongodb";
import Accounts from "@/models/Accounts";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  await connectToMongoDB();

  try {
    // var res = connection.model("Accounts").findOne({ name: "Purit" });
    // console.log(await res.exec());

    const res = await Accounts.find({}).exec();
    console.log("res: ", res);
    // console.log("test: ", connection.models);

    return NextResponse.json(res);
  } catch (error) {
    console.log("error: ", error);
  }

  return NextResponse.json("Success");
}
