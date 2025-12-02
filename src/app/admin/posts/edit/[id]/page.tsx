"use client";

import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useRouter, useParams } from "next/navigation"; // Use useParams to get ID
import Image from "next/image";
import { useAuth } from "../../../../../context/authContext";
import RichEditor from "components/admin/RichEditor";
import { PhotoIcon } from "@heroicons/react/24/outline";

// ... Same interfaces as Create Page ...
interface Category { id: string; name: string; }
interface EditPostForm {
  title: string;
  excerpt: string;
  content: string;
  categoryId: string;
  coverImage: string;
  status: "DRAFT" | "PUBLISHED";
}

export default function EditPostPage() {
  const { token } = useAuth();
  const router = useRouter();
  const params = useParams(); // Get ID from URL
  const postId = params.id as string;

  const [categories, setCategories] = useState<Category[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const { register, handleSubmit, control, setValue, watch, reset, formState: { errors } } = useForm<EditPostForm>();
  const coverImageUrl = watch("coverImage");

  // 1. Fetch Categories & Post Data
  useEffect(() => {
    const init = async () => {
      try {
        // A. Categories
        const catRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/categories`);
        setCategories(await catRes.json());

        // B. Post Data (We need a public or protected endpoint to get single post by ID)
        // Assuming you have GET /posts/:id OR /posts/admin/:id
        // Using public for now as logic is same
        // Note: You might need to add a "getById" in your backend if /posts/:slug is the only way
        // But assuming your backend has GET /posts/:id (UUID)
        console.log("postRes", postId);
        
       const postRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts/by-id/${postId}`, {
                            headers: { Authorization: `Bearer ${token}` }
                            });
        console.log("postRes", postRes);
        
        if (!postRes.ok) throw new Error("Post not found");
        
        const post = await postRes.json();

        // C. Pre-fill Form
        reset({
          title: post.title,
          excerpt: post.excerpt,
          content: post.content,
          categoryId: post.categoryId, // Ensure backend returns categoryId
          coverImage: post.coverImage,
          status: post.status,
        });

      } catch (err) {
        console.error(err);
        alert("Failed to load post data");
        router.push("/admin/posts");
      } finally {
        setIsLoading(false);
      }
    };

    if (token && postId) init();
  }, [token, postId, reset, router]);

  // 2. Handle Update
  const onSubmit = async (data: EditPostForm) => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts/${postId}`, {
        method: "PATCH", // Use PATCH for updates
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error("Failed to update");
      
      router.push("/admin/posts");
      router.refresh(); // Refresh server data
    } catch (error) {
      alert("Error updating post");
    }
  };

  // 3. Image Upload Logic (Reuse from Create Page)
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
     // ... (Copy exact same logic from Create Page) ...
     if (!e.target.files || !e.target.files[0]) return;
     setIsUploading(true);
     const formData = new FormData();
     formData.append("file", e.target.files[0]);
     try {
       const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/upload`, {
         method: "POST", headers: { Authorization: `Bearer ${token}` }, body: formData
       });
       const data = await res.json();
       setValue("coverImage", data.url);
     } catch (err) { alert("Upload failed"); } finally { setIsUploading(false); }
  };

  if (isLoading) return <div className="p-8">Loading post data...</div>;

  return (
    <div className="max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Edit Post</h1>
      
      <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Same layout as Create Page */}
        <div className="lg:col-span-2 space-y-6">
           {/* Title */}
           <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
             <label className="block text-sm font-medium mb-2">Title</label>
             <input {...register("title", { required: true })} className="block w-full rounded-md border-gray-300 shadow-sm p-3 border" />
           </div>
           
           {/* Excerpt */}
           <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
             <label className="block text-sm font-medium mb-2">Excerpt</label>
             <textarea {...register("excerpt")} rows={3} className="block w-full rounded-md border-gray-300 shadow-sm p-3 border" />
           </div>

           {/* Editor */}
           <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
             <label className="block text-sm font-medium mb-2">Content</label>
             <Controller
                name="content" control={control}
                render={({ field }) => <RichEditor value={field.value ?? ""} onChange={field.onChange} token={token} />}
             />
           </div>
        </div>

        {/* Right Sidebar */}
        <div className="space-y-6">
           <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <button type="submit" className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                Update Post
              </button>
           </div>
           
           {/* Category & Image Fields (Same as Create Page) */}
           {/* ... Copy inputs for Category and Image from Create Page ... */}
           <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <label className="block text-sm font-medium mb-2">Category</label>
              <select {...register("categoryId")} className="block w-full rounded-md border-gray-300 shadow-sm p-2 border">
                {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
           </div>
           
           {/* Image Upload Block (Simplified for brevity, use full code from Create) */}
           <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
             <label className="block text-sm font-medium mb-2">Cover Image</label>
             {coverImageUrl && <Image src={coverImageUrl} alt="Cover" width={300} height={200} className="rounded mb-2" />}
             <input type="file" onChange={handleImageUpload} disabled={isUploading} />
           </div>
        </div>
      </form>
    </div>
  );
}