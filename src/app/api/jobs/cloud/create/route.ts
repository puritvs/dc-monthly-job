import { connectToMongoDB } from "@/lib/mongodb";
import { Job } from "@/lib/types/job";
import Jobs from "@/models/Jobs";
import { ObjectId } from "mongodb";

import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    // await connectToMongoDB();
    const data: { job: Job; userId: string } = await request.json();

    const newJob = new Jobs({
      ...data.job,
      _id: new ObjectId(),
      userId: data.userId,
    });
    // console.log("newJob: ", newJob);

    const result = await Jobs.insertMany([newJob]);

    return NextResponse.json(JSON.stringify(result));
  } catch (err) {
    return NextResponse.json(`Error: ${err}`);
  }
}
