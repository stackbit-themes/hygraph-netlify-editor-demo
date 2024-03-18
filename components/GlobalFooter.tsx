"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function GlobalFooter() {
  const path = usePathname();

  let slug = "";

  if (path === "/") {
    slug = "home";
  } else {
    slug = path.replace("/pdp/", "");
  }

  return (
    <footer className="bg-dark text-light mx-auto max-w-screen-2xl">
      <div className="mx-auto flex flex-wrap gap-4 justify-between items-center px-5 py-5 md:py-8">
        <div className="space-x-4">
          <span className="font-bold font-title text-2xl">
            <Link href="/">skncre</Link>
          </span>
          <span className="text-md">
            By
            <Link
              className="underline"
              href="https://hygraph.com"
              target="_blank"
            >
              Hygraph
            </Link>
          </span>
        </div>

        <nav className="flex flex-wrap gap-x-6 gap-y-2 items-center md:text-xl">
          <Link href="/pdp/face-serum">face serum</Link>
          <Link href="/pdp/face-cream">face cream</Link>
          <Link href="/pdp/eye-contour">eye contour</Link>
          <Link href="/pdp/bundle">skncre bundle</Link>
          <Link href={`/api/draft?slug=${slug}&secret=MY_SECRET_TOKEN`}>
            Draft mode
          </Link>
        </nav>
      </div>
    </footer>
  );
}
