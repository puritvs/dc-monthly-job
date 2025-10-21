import { connectToMongoDB } from "@/lib/mongodb";
import Jobs from "@/models/Jobs";
import fs from "fs";
import { NextResponse } from "next/server";
import path from "path";

export async function POST(request: Request) {
  const data = await request.json();
  try {
    await connectToMongoDB();
    const jobs = await Jobs.find({
      id: data._id,
    });
    // console.log(jobs);

    // const result = fs.writeFile("./test.json", JSON.stringify(data), (err) => {
    //   console.log("save file error: ", err);
    // });
    return NextResponse.json(JSON.stringify(jobs));
  } catch (err) {
    return NextResponse.json(`Error: ${err}`);
  }
}

export async function GET(request: Request) {
  console.log("requesting: ");

  return NextResponse.json("Success");
}
