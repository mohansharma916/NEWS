"use client";

import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useAuth } from "../../../../context/authContext";
import RichEditor from "components/admin/RichEditor";
import { PhotoIcon } from "@heroicons/react/24/outline";

// Types
interface Category {
  id: string;
  name: string;
}

interface CreatePostForm {
  title: string;
  excerpt: string;
  content: string;
  categoryId: string;
  coverImage: string;
  status: "DRAFT" | "PUBLISHED";
}

export default function CreatePostPage() {
  const { token } = useAuth();
  const router = useRouter();
  const [categories, setCategories] = useState<Category[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  
  // React Hook Form Setup
  const { register, handleSubmit, control, setValue, watch, formState: { errors } } = useForm<CreatePostForm>({
    defaultValues: {
      status: "DRAFT",
      content: "",
    },
  });

  const coverImageUrl = watch("coverImage"); // Watch this to show preview

  // 1. Fetch Categories on Load
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/categories`);
        const data = await res.json();
        setCategories(data);
      } catch {
        console.error("Failed to load categories");
      }
    };
    fetchCategories();
  }, []);

  // 2. Handle Image Upload (Hits your NestJS Upload Module)
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || !e.target.files[0]) return;
    
    setIsUploading(true);
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/upload`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`, // Protect the upload
        },
        body: formData,
      });

      if (!res.ok) throw new Error("Upload failed");

      const data = await res.json();
      // NestJS returns { url: "..." }
      setValue("coverImage", data.url); 
    } catch {
      alert("Failed to upload image");
    } finally {
      setIsUploading(false);
    }
  };

  // 3. Submit Form
  const onSubmit = async (data: CreatePostForm) => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
          const errorData = await res.json();
          throw new Error(errorData.message || "Failed to create post");
      }

      router.push("/admin/posts"); // Redirect to list
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      alert(message);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 gap-8 lg:grid-cols-3">
      
      {/* LEFT COLUMN: Main Content */}
      <div className="lg:col-span-2 space-y-6">
        
        {/* Title Input */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <label className="block text-sm font-medium text-gray-700 mb-2">Post Title</label>
          <input
            {...register("title", { required: "Title is required" })}
            type="text"
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-lg py-3 px-4"
            placeholder="Enter an engaging title..."
          />
          {errors.title && <span className="text-red-500 text-sm">{errors.title.message}</span>}
        </div>

        {/* Excerpt Input */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <label className="block text-sm font-medium text-gray-700 mb-2">Excerpt (Short Summary)</label>
          <textarea
            {...register("excerpt", { required: "Excerpt is required" })}
            rows={3}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            placeholder="A short description for the card view..."
          />
          {errors.excerpt && <span className="text-red-500 text-sm">{errors.excerpt.message}</span>}
        </div>

        {/* Rich Text Editor */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <label className="block text-sm font-medium text-gray-700 mb-2">Content</label>
          <Controller
            name="content"
            control={control}
            rules={{ required: "Content is required" }}
            render={({ field }) => (
              <RichEditor value={field.value ?? ""} onChange={field.onChange} token={token}/>
            )}
          />
          {errors.content && <span className="text-red-500 text-sm">{errors.content.message}</span>}
        </div>
      </div>

      {/* RIGHT COLUMN: Settings */}
      <div className="space-y-6">
        
        {/* Publish Action */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-sm font-medium text-gray-900 mb-4">Publishing</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Status</label>
              <select
                {...register("status")}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                <option value="DRAFT">Draft</option>
                <option value="PUBLISHED">Published</option>
              </select>
            </div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Save Post
            </button>
          </div>
        </div>

        {/* Category Selector */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
          <select
            {...register("categoryId", { required: "Please select a category" })}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
          {errors.categoryId && <span className="text-red-500 text-sm">{errors.categoryId.message}</span>}
        </div>

        {/* Cover Image Upload */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <label className="block text-sm font-medium text-gray-700 mb-2">Cover Image</label>
          
          <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
            <div className="space-y-1 text-center">
              {coverImageUrl ? (
                <div className="relative h-40 w-full mb-4">
                  <Image 
                    src={coverImageUrl} 
                    alt="Cover" 
                    fill 
                    className="object-cover rounded-md" 
                  />
                  <button 
                    type="button"
                    onClick={() => setValue("coverImage", "")}
                    className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 text-xs"
                  >
                    X
                  </button>
                </div>
              ) : (
                <PhotoIcon className="mx-auto h-12 w-12 text-gray-400" />
              )}
              
              <div className="flex text-sm text-gray-600 justify-center">
                <label className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none">
                  <span>{isUploading ? "Uploading..." : "Upload a file"}</span>
                  <input 
                    type="file" 
                    className="sr-only" 
                    accept="image/*"
                    disabled={isUploading}
                    onChange={handleImageUpload}
                  />
                </label>
              </div>
              <p className="text-xs text-gray-500">PNG, JPG, GIF up to 5MB</p>
            </div>
          </div>
          {/* Hidden Input to actually register the URL string for the form */}
          <input 
            type="hidden" 
            {...register("coverImage", { required: "Cover image is required" })} 
          />
          {errors.coverImage && <span className="text-red-500 text-sm">{errors.coverImage.message}</span>}
        </div>

      </div>
    </form>
  );
}