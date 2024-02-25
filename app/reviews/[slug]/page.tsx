import type { Metadata } from 'next';
import Image from "next/image";
import { ChatBubbleBottomCenterTextIcon } from '@heroicons/react/24/outline';
import CommentForm from "@/components/CommentForm";
import CommentList from '@/components/CommentList';
import { notFound } from "next/navigation";
import Heading from "@/components/Heading";
import ShareLinkButton from "@/components/ShareLinkButton";
import { getReview, getSlugs } from "@/lib/reviews";

//export const dynamic = "force-dynamic";

export async function generateStaticParams() {
  const slugs = await getSlugs();
  //console.log("[ReviewPage] generateStaticParams", slugs);
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({params : {slug}}) : Promise<Metadata> {
  const review = await getReview(slug);
  if (!review) {
    notFound();
  }
  const { title } = review;
  return { title }
}

export default async function ReviewPage({params : {slug}}) {
  console.log("[ReviewPage] rendering", slug);
  const review = await getReview(slug);
  if (!review) {
    notFound();
  }
  const {date, image, body, title, subtitle } = review;


  return (
    <>
      <Heading>{title}</Heading>
      <p className="font-semibold pb-3">
        {subtitle}
      </p>
      <div className="flex gap-3 items-baseline">
        <p className="italic pb-2">{date}</p>
        <ShareLinkButton />
      </div>
      <Image src={image} alt="" priority
        width="640" height="360"
        className="mb-2 rounded"
        />
      <article dangerouslySetInnerHTML={{__html: body}} 
        className="max-w-screen-sm prose prose-slate" />

      <section className="border-dashed border-t max-w-screen-sm mt-3 py-3">
        <h2 className="font-bold flex gap-2 items-center text-xl">
          <ChatBubbleBottomCenterTextIcon className="h-6 w-6" />
          Comments
        </h2>
        <CommentForm title={title} />
        <CommentList />
      </section>
    </>
  )
}