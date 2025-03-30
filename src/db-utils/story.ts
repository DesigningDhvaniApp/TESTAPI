import { IStory, Story } from "#models/Story.ts";

export const saveStory = async (storyData: Partial<IStory>) => {
  const story: IStory = new Story(storyData);
  return await story.save();
};

export const findStoryById = async (id: string): Promise<IStory | null> => {
  if (!id) return null;
  return await Story.findById(id);
};
