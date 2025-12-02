"use client";

import dynamic from "next/dynamic";
import { useMemo, useRef, useCallback } from "react";
import "react-quill-new/dist/quill.snow.css";
import ReactQuill from "react-quill-new"; 

// THE FIX: Cast the dynamic component to 'any' to bypass the Ref type conflict.
// This tells TypeScript: "Trust me, I know what props this accepts."
const ReactQuillNew = dynamic(
  () => import("react-quill-new"), 
  { ssr: false }
) as unknown as typeof ReactQuill;

type Props = {
  value: string;
  onChange: (value: string) => void;
  token?: string | null;
};

export default function RichEditor({ value, onChange, token }: Props) {
  // Use the imported Class type for the Ref so we get autocomplete (getEditor, etc.)
  const quillRef = useRef<ReactQuill>(null);

  const imageHandler = useCallback(() => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();

    input.onchange = async () => {
      const file = input.files ? input.files[0] : null;
      if (!file) return;

      const formData = new FormData();
      formData.append("file", file);

      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/upload`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        });

        if (!res.ok) throw new Error("Upload failed");

        const data = await res.json();
        const url = data.url;

        // Safe access
        if (quillRef.current) {
          const quill = quillRef.current.getEditor();
          const range = quill.getSelection();
          
          if (range) {
            quill.insertEmbed(range.index, "image", url);
            quill.setSelection(range.index + 1);
          } else {
            const length = quill.getLength();
            quill.insertEmbed(length, "image", url);
          }
        }
      } catch (error) {
        console.error("Image upload failed", error);
        alert("Failed to upload image to server.");
      }
    };
  }, [token]);

  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          [{ header: [1, 2, 3, false] }],
          ["bold", "italic", "underline", "strike", "blockquote"],
          [{ list: "ordered" }, { list: "bullet" }],
          ["link", "image"],
          ["clean"],
        ],
        handlers: {
          image: imageHandler,
        },
      },
    }),
    [imageHandler]
  );

  return (
    <div className="bg-white">
      <ReactQuillNew
        ref={quillRef} 
        theme="snow"
        value={value}
        onChange={onChange}
        modules={modules}
        className="h-96 mb-12"
      />
    </div>
  );
}