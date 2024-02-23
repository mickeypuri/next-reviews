"use client";

import { Combobox } from "@headlessui/react";
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

  return (
    <div className="relative w-48">
      <Combobox>
        <Combobox.Input placeholder="Search..." className="border px-2 py-1 rounded w-full" />
        <Combobox.Options className="absolute bg-white py-1">
          {reviews.map((review) => (
            <Combobox.Option key={review.slug} value={review.slug}>
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
