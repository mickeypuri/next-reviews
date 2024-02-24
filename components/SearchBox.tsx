"use client";

import { Combobox } from "@headlessui/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
// import { useIsClient } from "@/lib/hooks";

const reviews = [
  { slug: 'a-way-out-2018', title: 'A Way Out' },
  { slug: 'warhammer-vermintide-2', title: 'Warhammer: Vermintide 2' },
  { slug: 'celeste', title: 'Celeste' },
  { slug: 'subnautica', title: 'Subnautica' },
  { slug: 'cuphead', title: 'Cuphead' }
];

export default function SearchBox() {
/*   const isClient = useIsClient();
  if (!isClient) {
    return null;
  } */

  const router = useRouter();
  const [query, setQuery] = useState("");
  const filtered = reviews.filter((review) => review.title.includes(query));
  const handleChange = (review) => {
    //console.log("selected:", review);
    router.push(`/reviews/${review.slug}`);
  };

  //console.log("[SearchBox] query:", query);
  
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
          {filtered.map((review) => (
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
