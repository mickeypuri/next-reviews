import Link from "next/link"
import Image from "next/image";
import Heading from "@/components/Heading"
import { getReviews, getSearchableReviews } from "@/lib/reviews"
import { PaginationBar } from "@/components/PaginationBar";
import SearchBox from "@/components/SearchBox";

// export const revalidate = 30; // seconds

export const metadata = {
  title: "Reviews",
};

const PAGE_SIZE = 6;

// export const dynamic = "force-dynamic";

export default async function ReviewsPage({ searchParams}) {
  const page = parsePageParam(searchParams.page);
  const {reviews, pageCount} = await getReviews(PAGE_SIZE, page);
  const searchableReviews = await getSearchableReviews();

  console.log("[ReviewsPage] rendering:", page);

  return (
    <>
      <Heading>Reviews</Heading>
      <div className="flex justify-between pb-3">
        <PaginationBar page={page} pageCount={pageCount} href="/reviews" />
        <SearchBox reviews={searchableReviews} />
      </div>
      <ul className="flex flex-row flex-wrap gap-3">
        {reviews.map((review, index) => (
          <li className="border w-80 rounded bg-white shadow hover:shadow-xl" key={review.slug}>
            <Link href={`/reviews/${review.slug}`}>
              <Image src={review.image} alt="" priority={index === 0}
                width="320" height="180"
                className="rounded-t"
              />
              <h2 className="font-semibold font-orbitron py-1 text-center">
                {review.title}
              </h2>
            </Link>
        </li>
        ))}
      </ul>
      
    </>
  )
}

function parsePageParam(paramValue) {
  if (paramValue) {
    const page = parseInt(paramValue);
    if (isFinite(page) && page > 0) {
      return page;
    }
  }
  return 1;
}