"use client";

import dynamic from "next/dynamic";
import "react-quill-new/dist/quill.snow.css"; // Import styles

// Dynamic import with SSR disabled
const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });

type Props = {
  value: string;
  onChange: (value: string) => void;
};

const modules = {
  toolbar: [
    [{ header: [1, 2, 3, false] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [{ list: "ordered" }, { list: "bullet" }],
    ["link", "image"],
    ["clean"],
  ],
};

export default function RichEditor({ value, onChange }: Props) {
  return (
    <div className="bg-white">
      <ReactQuill
        theme="snow"
        value={value}
        onChange={onChange}
        modules={modules}
        className="h-96 mb-12" // mb-12 to make space for the toolbar
      />
    </div>
  );
}