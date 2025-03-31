import { IStory, Story } from "#models/Story";

export const createStoryHandler = async (input: Partial<IStory>) => {
  const stories = await findAllStories();
  input.storyId = 1000 + stories.length;
  input.type = "user_story";
  const story = new Story(input);
  await story.save();
};

export const findAllStories = async (): Promise<IStory[]> => {
  const stories = await Story.find({});
  return stories;
};

export const updateStoryHandler = async (body: any, id: string) => {
  const { assignedTo, description, status, title } = body;
  const updatedStory = await Story.findByIdAndUpdate(id, { assignedTo, description, status, title }, { new: true });
  return updatedStory;
};

export const addCommentHandler = async (comment: string, id: string) => {
  const story = await Story.findById(id);
  console.log(story);
  if (story) {
    story.comments.push(comment);
    await story.save();
  }
};
