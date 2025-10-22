import { connectToMongoDB } from "@/lib/mongodb";
import { Job } from "@/lib/types/job";
import Jobs from "@/models/Jobs";
import fs from "fs";
import { NextResponse } from "next/server";
import path from "path";
import { id } from "zod/v4/locales";

export async function POST(request: Request) {
  try {
    await connectToMongoDB();
    const data: { jobs: Job[]; userId: string } = await request.json();
    console.log("data: ", data);

    const result = await Jobs.insertMany(
      data.jobs.map((j: Job) => {
        return {
          //   _id: "",
          type: j.type,
          name: j.name,
          periodType: j.periodType,
          startDate: j.startDate,
          endDate: j.endDate,
          description: j.description,
          remark: j.remark,
          userId: data.userId,
        };
      })
    );
    console.log("result: ", result);

    // const result = fs.writeFile("./test.json", JSON.stringify(data), (err) => {
    //   console.log("save file error: ", err);
    // });
    return NextResponse.json(JSON.stringify(result));
  } catch (err) {
    return NextResponse.json(`Error: ${err}`);
  }
}
