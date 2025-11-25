import { connectToMongoDB } from "@/lib/mongodb";
import { Job } from "@/lib/types/job";
import Jobs from "@/models/Jobs";
import { ObjectId } from "mongodb";

import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const data: { job: Job; userId: string } = await request.json();

    const result = await Jobs.deleteOne({ _id: data.job._id });

    return NextResponse.json(JSON.stringify(result));
  } catch (err) {
    return NextResponse.json(`Error: ${err}`);
  }
}
