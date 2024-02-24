import { marked } from "marked";
import qs from "qs";

export const CACHE_TAG_REVIEWS = "reviews";

const CMS_URL = "http://localhost:1337";

export async function getReview(slug: string) {
  const parameters = {
    filters: { slug: { $eq: slug } },
    fields: ["slug", "title", "subtitle", "publishedAt", "body" ],
    populate: { image: { fields: ["url"]}},
    pagination: { pageSize: 1, withCount: false },
  };
  const { data } = await fetchReviews(parameters);
  if (data.length === 0) {
    return null;
  }
  const item = data[0];
  
  return {
    ...toReview(item),
    body: marked(item.attributes.body),
  };
}

export async function getReviews(pageSize, page?) {
  const parameters = {
    fields: ["slug", "title", "subtitle", "publishedAt",],
    populate: { image: { fields: ["url"] } },
    sort: ["publishedAt:desc"],
    pagination: { pageSize, page },
  };
  const { data, meta } = await fetchReviews(parameters);
  return {
    pageCount: meta.pagination.pageCount,
    reviews: data.map(toReview)
  };
}

export async function searchReviews(query) {
  const parameters = {
    filters: { title: { $containsi: query } },
    fields: ["slug", "title"],
    sort: ["title"],
    pagination: { pageSize: 5 },
  };
  const { data } = await fetchReviews(parameters);
  return data.map(({attributes: {slug, title}}) => ({slug, title}));
}

export async function getSearchableReviews() {
  const parameters = {
    fields: ["slug", "title"],
    sort: ["publishedAt:desc"],
    pagination: { pageSize: 100 },
  };
  const { data } = await fetchReviews(parameters);
  return data.map(({attributes: {slug, title}}) => ({slug, title}));
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
  //console.log("[fetchReviews]:", url);
  const response = await fetch(url, {
    next: {
      tags: [CACHE_TAG_REVIEWS]
    }
  });
  if (!response.ok) {
    console.log(`Error: ${JSON.stringify(response)}`);
    throw new Error(`CMS returned ${response.status} for ${url}`);
  }
  return await response.json();
}

function toReview(item) {
  const { attributes: { slug, title, publishedAt, image, subtitle } } = item ;
  return {
    slug,
    title,
    subtitle,
    date: publishedAt.slice(0, "yyyy-mm-dd".length),
    image: CMS_URL + image.data.attributes.url
  };
}