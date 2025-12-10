import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { getAuthorById } from "../../../lib/api";
import { getDate } from "utils/Utility";
import { GlobeAltIcon } from "@heroicons/react/24/outline";

// --- ICONS FOR SOCIALS (You can use react-icons or SVGs) ---
function XIcon({ className }: { className?: string }) {
  return (
    <svg fill="currentColor" viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path d="M13.6823 10.6218L20.2391 3H18.6854L12.9921 9.61788L8.44486 3H3.2002L10.0765 13.0074L3.2002 21H4.75404L10.7663 14.0113L15.5685 21H20.8131L13.6819 10.6218ZM11.5541 13.0956L10.8574 12.0991L5.31391 4.16971H7.70053L12.1742 10.5689L12.8709 11.5655L18.6861 19.8835H16.2995L11.5541 13.096V13.0956Z" />
    </svg>
  );
}

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg fill="currentColor" viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path
        fillRule="evenodd"
        d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"
        clipRule="evenodd"
      />
    </svg>
  );
}

type Props = {
  params: Promise<{ id: string }>;
};

// 1. DYNAMIC METADATA
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const author = await getAuthorById(id);

  if (!author) return { title: "Author Not Found" };

  return {
    title: `${author.fullName} - Journalist | Know Your Views`,
    description: author.bio || `Read the latest articles by ${author.fullName}.`,
    robots: { index: true, follow: true },
  };
}

export default async function AuthorPage(props: Props) {
  const params = await props.params;
  const author = await getAuthorById(params.id);

  if (!author) notFound();

  // 2. SCHEMA.ORG PROFILE
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    "mainEntity": {
      "@type": "Person",
      "name": author.fullName,
      "image": author.avatarUrl,
      "description": author.bio,
      "sameAs": [
         author.twitterHandle ? `https://twitter.com/${author.twitterHandle.replace('@','')}` : null,
         author.linkedinUrl,
         author.websiteUrl
      ].filter(Boolean)
    }
  };

  return (
    <main className="min-h-screen bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* --- HEADER SECTION --- */}
      <div className="bg-slate-50 border-b border-gray-200">
        <div className="mx-auto flex max-w-5xl flex-col items-center py-12 px-4 text-center md:flex-row md:text-left md:space-x-10 md:py-20">
          
          {/* Avatar */}
          <div className="relative h-32 w-32 shrink-0 overflow-hidden rounded-full border-4 border-white shadow-lg md:h-40 md:w-40">
            <Image 
              src={author.avatarUrl || "/images/placeholder-avatar.png"} 
              alt={author.fullName} 
              fill 
              className="object-cover"
            />
          </div>

          {/* Info */}
          <div className="mt-6 md:mt-0">
            <h1 className="text-3xl font-bold text-gray-900 md:text-4xl">
              {author.fullName}
            </h1>
            <p className="mt-1 text-sm font-medium text-blue-600 uppercase tracking-wide">
              Verified Author
            </p>
            
            {/* Conditional Bio */}
            {author.bio && (
              <p className="mt-4 max-w-2xl text-lg text-gray-600 leading-relaxed">
                {author.bio}
              </p>
            )}

            {/* Conditional Social Links */}
            <div className="mt-6 flex items-center justify-center space-x-5 md:justify-start">
              
              {author.twitterHandle && (
                <Link
                  href={`https://twitter.com/${author.twitterHandle.replace('@', '')}`}
                  target="_blank"
                  className="text-gray-400 hover:text-black transition"
                >
                  <span className="sr-only">Twitter</span>
                  <XIcon className="h-6 w-6" />
                </Link>
              )}

              {author.linkedinUrl && (
                <Link
                  href={author.linkedinUrl}
                  target="_blank"
                  className="text-gray-400 hover:text-[#0077b5] transition"
                >
                  <span className="sr-only">LinkedIn</span>
                  <LinkedInIcon className="h-6 w-6" />
                </Link>
              )}

              {author.websiteUrl && (
                <Link
                  href={author.websiteUrl}
                  target="_blank"
                  className="text-gray-400 hover:text-blue-600 transition"
                >
                  <span className="sr-only">Website</span>
                  <GlobeAltIcon className="h-6 w-6" />
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* --- ARTICLES GRID --- */}
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between border-b border-gray-200 pb-5">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
            Latest Articles
          </h2>
          <span className="text-sm text-gray-500">
            {author.posts.length} Posts
          </span>
        </div>

        {author.posts.length > 0 ? (
          <div className="mt-8 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {author.posts.map((post) => (
              <Link key={post.id} href={`/news/${post.slug}`} className="group flex flex-col">
                <div className="relative aspect-[16/9] w-full overflow-hidden rounded-xl bg-gray-100">
                  <Image
                    src={post.coverImage || "/images/placeholder.jpg"}
                    alt={post.title}
                    fill
                    className="object-cover transition duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="mt-4 flex flex-1 flex-col">
                  <div className="flex items-center gap-x-2 text-xs text-gray-500">
                    <time dateTime={post.publishedAt}>
                      {getDate(post.publishedAt)}
                    </time>
                  </div>
                  <h3 className="mt-2 text-xl font-bold text-gray-900 group-hover:text-blue-600">
                    {post.title}
                  </h3>
                  <p className="mt-2 line-clamp-3 text-sm leading-6 text-gray-600">
                    {post.excerpt}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="mt-20 text-center">
            <p className="text-gray-500">This author hasn't published any articles yet.</p>
          </div>
        )}
      </div>
    </main>
  );
}