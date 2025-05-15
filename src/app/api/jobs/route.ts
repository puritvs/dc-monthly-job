import fs from "fs";
import { NextResponse } from "next/server";
import path from "path";

export async function POST(request: Request) {
  const data = await request.json();

  try {
    const result = fs.writeFile("./test.json", JSON.stringify(data), (err) => {
      console.log("save file error: ", err);
    });
    return NextResponse.json("Success");
  } catch (err) {
    return NextResponse.json(`Error: ${err}`);
  }
}

export async function GET(request: Request) {
  const filePath = request.json();
  console.log("requesting: ", filePath);

  return NextResponse.json("Success");
}
