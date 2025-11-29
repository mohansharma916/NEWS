"use client";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useAuth } from "../../../../context/authContext";
import Link from "next/link";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";

interface CreateCategoryForm {
  name: string;
  slug?: string;
  description?: string;
}

export default function CreateCategoryPage() {
  const { token } = useAuth();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CreateCategoryForm>();

  const onSubmit = async (data: CreateCategoryForm) => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/categories`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // <--- Protected Route
        },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Failed to create category");
      }

      // Success -> Go back to list
      router.push("/admin/categories");
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      alert(message);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6 flex items-center">
        <Link
          href="/admin/categories"
          className="mr-4 text-gray-500 hover:text-gray-700"
        >
          <ArrowLeftIcon className="h-5 w-5" />
        </Link>
        <h1 className="text-2xl font-bold text-gray-900">Create Category</h1>
      </div>

      <div className="bg-white rounded-lg shadow border border-gray-200 p-6">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          
          {/* Name Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Name <span className="text-red-500">*</span>
            </label>
            <input
              {...register("name", { required: "Name is required" })}
              type="text"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm py-2 px-3 border"
              placeholder="e.g. Artificial Intelligence"
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
            )}
          </div>

          {/* Slug Field (Optional) */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Slug <span className="text-gray-400 text-xs">(Optional - auto-generated if empty)</span>
            </label>
            <input
              {...register("slug")}
              type="text"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm py-2 px-3 border"
              placeholder="e.g. artificial-intelligence"
            />
          </div>

          {/* Description Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              {...register("description")}
              rows={4}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm py-2 px-3 border"
              placeholder="A brief description of this category..."
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-end pt-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-blue-300"
            >
              {isSubmitting ? "Creating..." : "Create Category"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}