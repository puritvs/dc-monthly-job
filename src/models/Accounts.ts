import mongoose, { Schema, Document, Types } from "mongoose";
export interface IAccount extends Document {
  _id: Types.ObjectId;
  username: string;
  password: string;
  name: string;
  surname: string;
  nickname: string;
}

const AccountSchema: Schema = new Schema(
  {
    _id: { type: Types.ObjectId, required: true, unique: true },
    username: { type: String, required: true },
    password: { type: String, required: true },

    name: { type: String, required: true },
    surname: { type: String, required: true },

    nickname: { type: String, required: true, unique: true },
  },
  { collection: "Accounts" }
);

const Accounts =
  mongoose.models.Accounts ||
  mongoose.model<IAccount>("Accounts", AccountSchema);

export default Accounts;
