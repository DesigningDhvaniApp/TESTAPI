import mailService from "../services/mail.service";
import { IStory, Story } from "../models/Story";

export const createStoryHandler = async (input: Partial<IStory>) => {
  input.storyId = 87954985
  input.type = 'user_story'
  const story = new Story(input)
  await story.save()
  

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
  const stories = await Story.find({})
  return stories
}

export const updateStoryHandler = async (body: any, id: string) => {
  const { status, title, description, assignedTo } = body;
  const updatedStory = await Story.findByIdAndUpdate(
    id,
    { title, description, assignedTo, status },
    { new: true }
  );
  return updatedStory
}
