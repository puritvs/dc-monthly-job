import { connectToMongoDB } from "@/lib/mongodb";
import Accounts from "@/models/Accounts";
import { NextResponse, type NextRequest } from "next/server";

// export async function GET(request: Request) {
//   await connectToMongoDB();

//   try {
//     const res = await Accounts.find({}).exec();

//     return NextResponse.json(res);
//   } catch (error) {
//     throw Error(JSON.stringify(error));
//   }
// }

export async function POST(request: NextRequest) {
  await connectToMongoDB();

  try {
    var data = await request.json();

    console.log("data: ", data);

    // var res = connec
    // tion.model("Accounts").findOne({ name: "Purit" });
    // console.log(await res.exec());

    const res = await Accounts.findOne(data).exec();
    console.log("res: ", res);

    // console.log("test: ", connection.models);

    return NextResponse.json(res);
  } catch (error) {
    console.log("error: ", error);
  }

  return NextResponse.json("Success");
}
