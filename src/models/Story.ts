import mongoose, { Document, Schema } from "mongoose";

export interface IStory extends Document {
  _id: mongoose.Types.ObjectId;
  storyId: number;
  title: string;
  description: string;
  status: string;
  type: string;
}

const StorySchema: Schema<IStory> = new Schema(
  {
    storyId: { type: Number, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    status: { type: String, required: true },
    type: { type: String, required: true }
  },
  { timestamps: true },
);

export const Story = mongoose.model<IStory>("Story", StorySchema);
