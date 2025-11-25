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
      userId: data.userId,
    });
    const result = await Jobs.replaceOne({ _id: newJob._id }, newJob);

    return NextResponse.json(JSON.stringify(result));
  } catch (err) {
    return NextResponse.json(`Error: ${err}`);
  }
}
