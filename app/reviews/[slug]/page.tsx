import Heading from "@/components/Heading";
import ShareLinkButton from "@/components/ShareLinkButton";
import { getReview, getSlugs } from "@/lib/reviews";

// export async function generateStaticParams() {
//   const slugs = await getSlugs();
//   return slugs.map((slug) => ({ slug }));
// }

export async function generateMetadata({params : {slug}}) {
  const { title } = await getReview(slug);
  return { title }
}

export default async function ReviewPage({params : {slug}}) {
  const review = await getReview(slug);
  const {date, image, body, title } = review;

  console.log("[ReviewPage] rendering", review);

  return (
    <>
      <Heading>{title}</Heading>
      <div className="flex gap-3 items-baseline">
        <p className="italic pb-2">{date}</p>
        <ShareLinkButton />
      </div>
      <img src={image} alt="" 
        width="640" height="360"
        className="mb-2 rounded"
        />
      <article dangerouslySetInnerHTML={{__html: body}} 
        className="max-w-screen-sm prose prose-slate" />
    </>
  )
}