import Image from "next/image";
import Heading from "@/components/Heading";
import ShareLinkButton from "@/components/ShareLinkButton";
import { getReview, getSlugs } from "@/lib/reviews";

export async function generateStaticParams() {
  const slugs = await getSlugs();
  //console.log("[ReviewPage] generateStaticParams", slugs);
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({params : {slug}}) {
  const { title } = await getReview(slug);
  return { title }
}

export default async function ReviewPage({params : {slug}}) {
  console.log("[ReviewPage] rendering", slug);
  const review = await getReview(slug);
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
    </>
  )
}