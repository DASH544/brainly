import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
      lowercase: true,
      trim: true,
    },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

export const UserModel = mongoose.model("user", userSchema);

const tagSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);
export const TagModel = mongoose.model("tag", tagSchema);
const contentTypes = ["image", "video", "article", "audio"];
const contentSchema = new Schema(
  {
    link: { type: String, required: true },
    type: { type: String, enum: contentTypes, required: true },
    title: { type: String, required: true },
    tags: [{ type: mongoose.Types.ObjectId, ref: "tags" }],
    userId: { type: mongoose.Types.ObjectId, ref: "users" },
  },
  { timestamps: true }
);
export const contentModel = mongoose.model("content", contentSchema);
