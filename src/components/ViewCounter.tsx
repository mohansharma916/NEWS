"use client";

import { useEffect, useRef } from "react";
import { incrementViewCount } from "../lib/api";

export default function ViewCounter({ postId }: { postId: string }) {
  // Use a ref to ensure we only count ONCE per page load (React 18 double-mount protection)
  const hasCounted = useRef(false);

  useEffect(() => {
    if (!hasCounted.current) {
      incrementViewCount(postId);
      hasCounted.current = true;
    }
  }, [postId]);

  return null; // This component renders nothing visually
}