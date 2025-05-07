import fs from "fs";
import { NextResponse } from "next/server";
import path from "path";

export async function POST(request: Request) {
  const data = await request.json();

  try {
    const result = fs.writeFile("./test.json", JSON.stringify(data), (err) => {
      console.log("save file error: ", err);
      //   if (err) throw err;
    });
    console.log("save success: ", result);
    return NextResponse.json("Success");
  } catch (err) {
    return NextResponse.json(`Error: ${err}`);
  }
}
