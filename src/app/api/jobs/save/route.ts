import { connectToMongoDB } from "@/lib/mongodb";
import { Job } from "@/lib/types/job";
import Jobs from "@/models/Jobs";

import { NextResponse } from "next/server";

import { ObjectId } from "mongodb";

export async function POST(request: Request) {
  try {
    // await connectToMongoDB();
    const data: { jobs: Job[]; userId: string } = await request.json();
    console.log("data: ", data);
    const bulkData = data.jobs.map((item) => {
      var { _id, ...rest } = item;
      console.log("processing: ", _id);

      return {
        updateOne: {
          upsert: true,
          filter: {
            _id: _id.length === 0 ? new ObjectId() : new ObjectId(_id),
          },
          update: { $set: { ...rest, userId: data.userId } },
        },
      };
    });

    const result = await Jobs.bulkWrite(bulkData);
    // const result = await Jobs.insertMany(
    //   data.jobs.map((j: Job) => {
    //     return {
    //       //   _id: "",
    //       type: j.type,
    //       name: j.name,
    //       periodType: j.periodType,
    //       startDate: j.startDate,
    //       endDate: j.endDate,
    //       description: j.description,
    //       remark: j.remark,
    //       userId: data.userId,
    //     };
    //   })
    // );
    console.log("result: ", result);

    return NextResponse.json(JSON.stringify(result));
  } catch (err) {
    return NextResponse.json(`Error: ${err}`);
  }
}
