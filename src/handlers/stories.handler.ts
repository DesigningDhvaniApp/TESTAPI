import { IStory, Story } from "#models/Story.ts";

export const createStoryHandler = async (input: Partial<IStory>) => {
  input.storyId = 87954985;
  input.type = "user_story";
  const story = new Story(input);
  await story.save();

  // return mailService.sendEmail({
  //   to: "satishreddysr777@gmail.com",
  //   subject: "",
  //   template: "welcome",
  //   replacements: {
  //     name: 'SATISH KUMAR REDDY TARAPAREDDY'
  //   },
  // });

  // return await saveMemberAndPayment(member, payment);
};

export const findAllStories = async () => {
  const stories = await Story.find({});
  return stories;
};

export const updateStoryHandler = async (body: any, id: string) => {
  const { assignedTo, description, status, title } = body;
  const updatedStory = await Story.findByIdAndUpdate(id, { assignedTo, description, status, title }, { new: true });
  return updatedStory;
};
