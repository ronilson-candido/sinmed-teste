import { NewsItem } from "@/app/types/news-type";
import slugify from "slugify";

const API_URL = "http://localhost:8080/notices";

export async function fetchNews(order: string): Promise<NewsItem[]> {
  try {
    const sortParam = order === "alpha" ? "title,asc" : `creationTime,${order}`;
    const response = await fetch(
      `http://localhost:8080/notices?sort=${sortParam}`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.log("Error fetching data:", error);
    return [];
  }
}
export async function fetchNewsBySlug(slug: string): Promise<NewsItem | null> {
  try {
    const response = await fetch(`${API_URL}/${slug}`);

    if (!response.ok) {
      console.error("Failed to fetch news by slug");
      return null;
    }

    const data: NewsItem = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching news by slug:", error);
    return null;
  }
}
