"use client";

import { createCommentAction } from "@/app/reviews/[slug]/actions";
import { FormEventHandler } from "react";

export interface CommentFormProps {
  title: string;
  slug: string;
}

export default function CommentForm({ title, slug }: CommentFormProps) {

  const handleSubmit: FormEventHandler = async (event) => {
    event.preventDefault();
    const form = event.currentTarget as HTMLFormElement;
    const formData = new FormData(form);
    console.log("formData:", [...formData.entries()]);
    const result = await createCommentAction(formData);
    console.log("result:", result);
  }

  return (
    <form onSubmit={handleSubmit} className="border bg-white flex flex-col gap-2 mt-3 px-3 py-3 rounded">
      <p className="pb-1">
        Already played <strong>{title}</strong>? Have your say!
      </p>
      <input type="hidden" name="slug" value={slug} />
      <div className="flex">
        <label htmlFor="userField" className="shrink-0 w-32">
          Your name
        </label>
        <input id="userField" name="user" className="border px-2 py-1 rounded w-48"  />
      </div>
      <div className="flex">
        <label htmlFor="messageField"  className="shrink-0 w-32">
          Your comment
        </label>
        <textarea id="messageField" name="message" className="border px-2 py-1 rounded w-full"  />
      </div>
      <button type="submit"
        className="bg-orange-800 rounded px-2 py-1 self-center
                   text-slate-50 w-32 hover:bg-orange-700">
        Submit
      </button>
    </form>
  );
}