import Link from "next/link";

export function PaginationBar({href, page, pageCount }) {
  return (
    <div className="flex gap-2 pb-3">
      <Link href={`${href}?page=${page - 1}`}>&lt;</Link>
      <span>Page {page} of {pageCount}</span>
      <Link href={`${href}?page=${page + 1}`}>&gt;</Link>
  </div>
  )
}