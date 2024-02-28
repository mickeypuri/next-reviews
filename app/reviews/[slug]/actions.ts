"use server";
import type { CreateCommentData } from '@/lib/comments';
import { createComment } from "@/lib/comments";
import { revalidatePath } from "next/cache";

export async function createCommentAction(formData: FormData) {

  const data : CreateCommentData = {
    slug: formData.get("slug") as string,
    user: formData.get("user") as string,
    message: formData.get("message") as string
  };

  const error = validate(data);
  if (error) {
    return { isError: true, message: error}
  }


  const result = await createComment(data);
  console.log("created:", result);
  revalidatePath(`/reviews/${data.slug}`);
}

function validate(data: CreateCommentData): string | undefined {
  if (!data.user) {
    return 'Name field is required';
  }
  if (data.user.length > 50) {
    return 'Name field cannot be longer than 50 characters';
  }
  if (!data.message) {
    return 'Comment field is required';
  }
  if (data.message.length > 500) {
    return 'Comment field cannot be longer than 500 characters';
  }
}