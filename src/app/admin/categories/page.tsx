"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useAuth } from "../../../context/authContext";
import { PlusIcon, TrashIcon } from "@heroicons/react/24/outline";

interface Category {
  id: string;
  name: string;
  slug: string;
  _count?: {
    posts: number;
  };
}

export default function CategoriesListPage() {
  const { token } = useAuth();
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // 1. Fetch Categories
  const fetchCategories = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/categories`, {
        // No auth needed for GET (public), but we might want admin-specific data later
        cache: "no-store",
      });
      const data = await res.json();
      setCategories(data);
    } catch{
      console.error("Failed to fetch categories");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // 2. Delete Category
  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure? This action cannot be undone.")) return;

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/categories/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`, // <--- Protected Route
        },
      });

      if (res.ok) {
        // Remove from UI immediately
        setCategories((prev) => prev.filter((cat) => cat.id !== id));
      } else {
        alert("Failed to delete. You might not have permission.");
      }
    } catch {
      alert("Error deleting category");
    }
  };

  if (isLoading) return <div className="p-8">Loading categories...</div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Categories</h1>
        <Link
          href="/admin/categories/create"
          className="flex items-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700"
        >
          <PlusIcon className="mr-2 h-5 w-5" />
          Add Category
        </Link>
      </div>

      <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                Slug
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                Posts Count
              </th>
              <th className="relative px-6 py-3">
                <span className="sr-only">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {categories.map((cat) => (
              <tr key={cat.id}>
                <td className="whitespace-nowrap px-6 py-4 font-medium text-gray-900">
                  {cat.name}
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-gray-500">
                  {cat.slug}
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-gray-500">
                  {cat._count?.posts || 0}
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
                  <button
                    onClick={() => handleDelete(cat.id)}
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
    </div>
  );
}