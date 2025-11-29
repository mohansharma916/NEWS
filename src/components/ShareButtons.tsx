// components/ShareButtons.tsx
"use client";
import { usePathname } from "next/navigation";

export default function ShareButtons({ title }: { title: string }) {
  const pathname = usePathname();
  const url = `https://theviewisland.com${pathname}`;
  
  const shareLinks = [
    { name: "WhatsApp", url: `https://wa.me/?text=${encodeURIComponent(title + " " + url)}`, color: "bg-green-500" },
    { name: "Twitter", url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`, color: "bg-black" },
    { name: "LinkedIn", url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, color: "bg-blue-700" },
  ];

  return (
    <div className="my-6 flex gap-2">
      <span className="mr-2 font-bold text-gray-700">Share:</span>
      {shareLinks.map((link) => (
        <a 
          key={link.name} 
          href={link.url} 
          target="_blank" 
          rel="noopener noreferrer"
          className={`${link.color} text-white px-3 py-1 rounded text-sm font-medium hover:opacity-80`}
        >
          {link.name}
        </a>
      ))}
    </div>
  );
}