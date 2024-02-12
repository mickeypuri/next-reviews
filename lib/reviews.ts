import { readdir, readFile } from "node:fs/promises";
import { marked } from "marked";
import matter from "gray-matter";

export async function getReview(slug: string) {
  const text = await readFile(`./content/reviews/${slug}.md`, "utf-8");
  const { content, data: { title, date, image } } = matter(text);
  const body = marked(content);
  return { slug, title, date, image, body };
}

export async function getReviews() {
  const slugs = await getSlugs();
  const reviews = [];
  for (const slug of slugs) {
    const review = await getReview(slug);
    reviews.push(review);
  }
  return reviews.sort((a, b) => b.date.localeCompare(a.date));
}

export async function getSlugs() {
  const files = await readdir("./content/reviews");
  return files.filter((file) => file.endsWith(".md"))
  .map((file) => file.slice(0, -3)); 
}

export async function getFeaturedReview() {
  const reviews = await getReviews();
  return reviews[0];
}