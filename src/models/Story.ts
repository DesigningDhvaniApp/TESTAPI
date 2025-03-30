import mongoose, { Document, Schema } from "mongoose";

export interface IStory extends Document {
  _id: mongoose.Types.ObjectId;
  description: string;
  status: string;
  storyId: number;
  title: string;
  comments: string[];
  type: string;
}

const StorySchema = new Schema<IStory>(
  {
    description: { required: true, type: String },
    status: { required: true, type: String },
    storyId: { required: true, type: Number },
    title: { required: true, type: String },
    type: { required: true, type: String },
    comments: [{ required: true, type: String }],
  },
  { timestamps: true },
);

export const Story = mongoose.model<IStory>("Story", StorySchema);
