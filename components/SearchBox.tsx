"use client";

import { searchReviews } from "@/lib/reviews";
import { Combobox } from "@headlessui/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";
// import { useIsClient } from "@/lib/hooks";

export default function SearchBox() {
/*   const isClient = useIsClient();
  if (!isClient) {
    return null;
  } */

  const router = useRouter();
  const [query, setQuery] = useState("");
  const [debouncedQuery] = useDebounce(query, 300);
  const [reviews, setReviews] = useState([]);
  useEffect(() => {
    if (debouncedQuery.length > 1) {
      const controller = new AbortController();
      (async () => {
        const url = `/api/search?query=${encodeURIComponent(debouncedQuery)}`;
        const response = await fetch(url, { signal: controller.signal });
        const reviews = await response.json();
        setReviews(reviews);
      })();
      return () => controller.abort();
    } else {
      setReviews([])
    }
  }, [debouncedQuery]);

  const handleChange = (review) => {
    //console.log("selected:", review);
    router.push(`/reviews/${review.slug}`);
  };


  //const filtered = reviews.filter((review) => review.title.toLowerCase().includes(query.toLowerCase())).slice(0,5);
  //console.log("[SearchBox] query:", {query, debouncedQuery});
  
  return (
    <div className="relative w-48">
      <Combobox onChange={handleChange}>
        <Combobox.Input 
          value={query} 
          placeholder="Search..."
          onChange={(event) => setQuery(event.target.value)}
          className="border px-2 py-1 rounded w-full"
        />
        <Combobox.Options className="absolute bg-white py-1">
          {reviews.map((review) => (
            <Combobox.Option key={review.slug} value={review}>
              {({ active }) => (
                <span className={`block px-2 truncate cursor-pointer ${active ? "bg-orange-100" : ""}`}>
                  {review.title}
                </span>
              )}
            </Combobox.Option>
          ))}
        </Combobox.Options>
      </Combobox>
    </div>
  );
}
