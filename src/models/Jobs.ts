import mongoose, { Schema, Document } from "mongoose";
import { ObjectId } from "mongodb";
interface IJob extends Document {
  _id: ObjectId;
  type: string;
  name: string;
  periodType: string;
  startDate: string;
  endDate: string;
  description: string;
  remark: string;
  userId: string;
}

const JobSchema: Schema = new Schema(
  {
    _id: { type: ObjectId, unique: true },
    type: { type: String, required: true },
    name: { type: String, required: true },

    periodType: { type: String, required: true },
    startDate: { type: String, required: true },

    endDate: { type: String, required: true },
    description: { type: String, required: true },
    remark: { type: String, required: true },
    userId: { type: String, required: true },
  },
  { collection: "Jobs" }
);

const Jobs = mongoose.models.Jobs || mongoose.model<IJob>("Jobs", JobSchema);

export default Jobs;
