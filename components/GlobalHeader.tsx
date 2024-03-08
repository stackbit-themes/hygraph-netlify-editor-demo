import Link from "next/link";

export default function GlobalHeader() {
  return (
    <header className="bg-dark text-light mx-auto max-w-screen-2xl">
      <div className="mx-auto flex flex-wrap gap-4 justify-between items-center px-5 py-5 md:py-8">
        <Link className="flex space-x-2" href="/">
          <span className="font-bold font-title text-3xl self-end">skncre</span>
        </Link>
        <nav className="flex flex-wrap gap-x-6 gap-y-2 items-center md:text-xl">
          <Link href="/pdp/face-serum">face serum</Link>
          <Link href="/pdp/face-cream">face cream</Link>
          <Link href="/pdp/eye-contour">eye contour</Link>
          <Link href="/pdp/bundle">skncre bundle</Link>
        </nav>
      </div>
    </header>
  );
}
