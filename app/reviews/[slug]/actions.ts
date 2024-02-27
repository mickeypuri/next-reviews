"use server";
import { createComment } from "@/lib/comments";
import { revalidatePath } from "next/cache";

export async function createCommentAction(formData: FormData) {

  if (!formData.get('user')) {
    return { isError: true, message: "Name field is required"};
  }

  if (!formData.get('message')) {
    return { isError: true, message: "Message field is required"};
  }

  const data = {
    slug: formData.get("slug"),
    user: formData.get("user"),
    message: formData.get("message")
  };

  const result = await createComment(data);
  console.log("created:", result);
  revalidatePath(`/reviews/${data.slug}`);
}