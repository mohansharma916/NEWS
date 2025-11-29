export const Categories = [
  "Home",
  "For You",
  "Following",
  "News Showcase",
  "India",
  "World",
  "Local",
  "Business",
  "Technology",
  "Entertainment",
  "Sports",
  "Science",
  "Health",
];

export const sortBy = [
  { id: 1, name: "Published at", value: "publishedAt" },
  { id: 2, name: "Relevancy", value: "relevancy" },
  { id: 3, name: "Popularity", value: "popularity" },
];

export const time = [
  { id: 1, name: "Today", value: "today" },
  { id: 2, name: "Yesterday", value: "yesterday" },
  { id: 3, name: "This week", value: "thisWeek" },
];

export const language = [
  { id: 1, name: "Arabic", value: "ar" },
  { id: 2, name: "German", value: "de" },
  { id: 3, name: "English", value: "en" },
  { id: 4, name: "Spanish", value: "es" },
  { id: 5, name: "French", value: "fr" },
  { id: 6, name: "Hebrew", value: "he" },
  { id: 7, name: "Italian", value: "it" },
  { id: 8, name: "Dutch", value: "nl" },
  { id: 9, name: "Norwegian", value: "no" },
  { id: 10, name: "Portuguese", value: "pt" },
  { id: 11, name: "Russian", value: "ru" },
  { id: 12, name: "Swedish", value: "sv" },
  { id: 13, name: "Urdu", value: "ud" },
  { id: 14, name: "Chinese", value: "zh" },
];

export const formattedTitle = (title?: string) =>
  title?.substring(title?.split(" ")[0].length);

export const getDate = (data?: string) => {
  const date = new Date(data ?? new Date());
  const formattedDate = new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(date);
  return formattedDate;
};

export const validArticles = async (
  articles: Articles[],
  limit: number = 7, // Number of valid articles to return
  concurrency: number = 10, // Number of parallel validations
): Promise<Articles[]> => {
  const validateImage = async (
    url?: string,
    timeout: number = 5000,
  ): Promise<boolean> => {
    if (!url) return false;

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    try {
      const response = await fetch(url, {
        method: "HEAD",
        signal: controller.signal,
      });
      const contentType = response.headers.get("Content-Type") || "";
      return response.ok && contentType.startsWith("image/");
    } catch {
      return false;
    } finally {
      clearTimeout(timeoutId);
    }
  };

  const results: Articles[] = [];
  const queue = [...articles];
  const pool: Promise<void>[] = [];

  const processNext = async () => {
    if (results.length >= limit || queue.length === 0) return;

    const article = queue.shift();
    if (!article) return;

    const isValid = await validateImage(article.urlToImage);
    if (
      isValid &&
      article.title !== "[Removed]" &&
      article.description !== null &&
      article.publishedAt !== null &&
      article?.source !== null &&
      article?.source?.name !== null
    ) {
      results.push(article);
    }

    if (results.length >= limit) return;
    await processNext();
  };

  for (let i = 0; i < concurrency; i++) {
    pool.push(processNext());
  }

  await Promise.all(pool);
  return results.slice(0, limit);
};
