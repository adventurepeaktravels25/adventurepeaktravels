"use client";

import { useEffect } from "react";

export function DetailPageTitle({ title }: { title: string }) {
  useEffect(() => {
    window.dispatchEvent(new CustomEvent("detail-page-title", { detail: { title } }));
    return () => {
      window.dispatchEvent(new CustomEvent("detail-page-title", { detail: { title: "" } }));
    };
  }, [title]);

  return null;
}
