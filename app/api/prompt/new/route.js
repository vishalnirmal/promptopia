import Prompt from "@models/Prompt";
import User from "@models/User";
import { connectToDb } from "@utils/database";

export const POST = async (req, res) => {
  const { userId, prompt, tag } = await req.json();

  try {
    await connectToDb();

    const doesUserExists = await User.findById(userId);

    if (!doesUserExists) {
      return new Response(
        JSON.stringify(
          {
            message: "Invalid User",
          },
          {
            status: 400,
          }
        )
      );
    }

    const createdPrompt = new Prompt({
      prompt,
      creator: userId,
      tag,
    });

    await createdPrompt.save();

    return new Response(JSON.stringify({ id: createdPrompt._id }), {
      status: 201,
    });
  } catch (error) {
    return new Response("Failed to create a prompt", { status: 500 });
  }
};
