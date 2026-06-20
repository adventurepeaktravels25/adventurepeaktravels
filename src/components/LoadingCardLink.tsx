"use client";

import Link from "next/link";
import { Loader2 } from "lucide-react";
import type { ReactNode } from "react";
import { useState } from "react";

export function LoadingCardLink({
  href,
  className,
  children,
}: {
  href: string;
  className?: string;
  children: ReactNode;
}) {
  const [loading, setLoading] = useState(false);

  return (
    <Link
      href={href}
      onClick={() => setLoading(true)}
      className={`${className ?? ""} relative overflow-hidden transition-transform duration-200 active:scale-[0.99]`}
    >
      {children}
      {loading ? (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-background/55 backdrop-blur-[1px]">
          <div className="inline-flex items-center gap-2 rounded-full bg-card px-3 py-2 text-xs font-semibold text-foreground shadow-soft">
            <Loader2 className="h-4 w-4 animate-spin text-primary" />
            Loading
          </div>
        </div>
      ) : null}
    </Link>
  );
}
