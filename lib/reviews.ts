import { marked } from "marked";
import qs from "qs";

const CMS_URL = "http://localhost:1337";

export async function getReview(slug: string) {
  const parameters = {
    filters: { slug: { $eq: slug } },
    fields: ["slug", "title", "subtitle", "publishedAt", "body" ],
    populate: { image: { fields: ["url"]}},
    pagination: { pageSize: 1, withCount: false },
  };
  const { data } = await fetchReviews(parameters);
  const item = data[0];
  
  return {
    ...toReview(item),
    body: marked(item.attributes.body),
  };
}

export async function getReviews(pageSize) {
  const parameters = {
    fields: ["slug", "title", "subtitle", "publishedAt",],
    populate: { image: { fields: ["url"] } },
    sort: ["publishedAt:desc"],
    pagination: { pageSize },
  };
  const { data } = await fetchReviews(parameters);
  return data.map(toReview);
}

export async function getSlugs() {
  const parameters = {
    fields: ["slug"],
    sort: ["publishedAt:desc"],
    pagination: { pageSize: 100 },
  };
  const { data } = await fetchReviews(parameters);
  return data.map((item) => item.attributes.slug);
}

async function fetchReviews(parameters) {
  const url = `${CMS_URL}/api/reviews?` + qs.stringify(parameters, { encodeValuesOnly: true });
  console.log("[fetchReviews]:", url);
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`CMS returned ${response.status} for ${url}`);
  }
  return await response.json();
}

function toReview(item) {
  const { attributes: { slug, title, publishedAt, image } } = item ;
  return {
    slug,
    title,
    date: publishedAt.slice(0, "yyyy-mm-dd".length),
    image: CMS_URL + image.data.attributes.url
  };
}