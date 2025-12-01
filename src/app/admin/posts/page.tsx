"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useAuth } from "../../../context/authContext";
import { PlusIcon, PencilSquareIcon,TrashIcon } from "@heroicons/react/24/outline";
import { getDate } from "utils/Utility";
import DeleteModal from "components/admin/DeleteModal";

// Define the shape of data from GET /posts/admin/all
interface AdminPost {
  id: string;
  title: string;
  status: "PUBLISHED" | "DRAFT" | "ARCHIVED";
  views: number;
  publishedAt: string | null;
  author: { fullName: string };
  category: { name: string } | null;
}

export default function AdminPostsPage() {
  const { token } = useAuth();
  const [posts, setPosts] = useState<AdminPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Fetch Data
  useEffect(() => {
    if (!token) return;

    const fetchPosts = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts/admin/all`, {
          headers: { Authorization: `Bearer ${token}` }, // Protected Route
        });
        if (res.ok) {
          const data = await res.json();
          setPosts(data);
        }
      } catch (error) {
        console.error("Failed to fetch admin posts", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, [token]);

  const confirmDelete = async () => {
    if (!deleteId) return;
    setIsDeleting(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts/${deleteId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.ok) {
        // Remove from local state immediately (Optimistic UI)
        setPosts((prev) => prev.filter((p) => p.id !== deleteId));
        setDeleteId(null);
      } else {
        alert("Failed to delete post");
      }
    } catch (error) {
      alert("Error deleting post");
    } finally {
      setIsDeleting(false);
    }
  };

  if (isLoading) return <div className="p-4">Loading posts...</div>;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">All Posts</h1>
        <Link
          href="/admin/posts/create"
          className="flex items-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700"
        >
          <PlusIcon className="mr-2 h-5 w-5" />
          Create New
        </Link>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                Title
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                Category
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                Date
              </th>
              <th className="relative px-6 py-3">
                <span className="sr-only">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {posts.map((post) => (
              <tr key={post.id}>
                {/* Title & Author */}
                <td className="px-6 py-4">
                  <div className="flex flex-col">
                    <span className="font-medium text-gray-900">{post.title}</span>
                    <span className="text-xs text-gray-500">by {post.author?.fullName}</span>
                  </div>
                </td>
                
                {/* Status Badge */}
                <td className="px-6 py-4">
                  <span
                    className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
                      post.status === "PUBLISHED"
                        ? "bg-green-100 text-green-800"
                        : post.status === "DRAFT"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {post.status}
                  </span>
                </td>

                {/* Category */}
                <td className="px-6 py-4 text-sm text-gray-500">
                  {post.category?.name || "Uncategorized"}
                </td>

                {/* Date */}
                <td className="px-6 py-4 text-sm text-gray-500">
                  {post.publishedAt ? getDate(post.publishedAt) : "-"}
                </td>

                {/* Actions */}
                <td className="px-6 py-4 text-right text-sm font-medium">
                  <Link
                    href={`/admin/posts/edit/${post.id}`}
                    className="text-blue-600 hover:text-blue-900"
                  >
                    <PencilSquareIcon className="h-5 w-5" />
                    <span className="sr-only">Edit</span>
                  </Link>
                  <button
                      onClick={() => setDeleteId(post.id)} // <--- Open Modal
                      className="text-red-600 hover:text-red-900"
                    >
                      <TrashIcon className="h-5 w-5" />
                    </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <DeleteModal 
        isOpen={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={confirmDelete}
        isDeleting={isDeleting}
        title="Delete Post?"
        message="Are you sure you want to delete this post? This will remove it from the public site immediately."
      />
    </div>
  );
}