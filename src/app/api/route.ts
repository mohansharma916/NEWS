/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextResponse } from "next/server";
import { language, sortBy, validArticles } from "utils/Utility";

export async function POST(request: Request) {
  const { ...params } = await request.json();
  const searchParam: SearchParams = params;

  if (!searchParam)
    return NextResponse.next(new Response("Missing params", { status: 400 }));

  const getSearch = searchParam.q ?? "latest";
  const getDate = searchParam.time ?? new Date().toISOString().slice(0, 10);
  const getSortBy =
    sortBy.find(async (o) => o.name === (await searchParam.q))?.value ??
    "relevancy";
  const getLanguage =
    language.find(async (o) => o.name === (await searchParam.language))
      ?.value ?? "us";

  // const dataRes = await fetch(
  //   `https://newsapi.org/v2/everything?q=${getSearch}&from=${getDate}&language=${getLanguage}&sortBy=${getSortBy}&apiKey=${process.env.NEWS_API}`,
  // );

  const dataRes = await fetch("https://theviewislandbackend.vercel.app/");

  if (!dataRes.ok) {
    return NextResponse.next(new Response("Data not found", { status: 400 }));
  }

  const post = await dataRes.json();

  if (!post) {
    return NextResponse.next(new Response("Data not found", { status: 400 }));
  }

  const articles = await validArticles(post.articles, 10, 20);

  if (!articles) {
    return NextResponse.next(new Response("Data not found", { status: 400 }));
  }

  return NextResponse.json(articles);
}
