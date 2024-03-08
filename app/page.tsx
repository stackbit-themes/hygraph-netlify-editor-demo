import type { Metadata } from "next";
import type { PageQuery } from "@/gql/graphql";
import { getPage } from "@/queries/getPage";
import ComponentRenderer from "@/components/ComponentRenderer";

export async function generateMetadata(): Promise<Metadata> {
  const { page }: PageQuery = await getPage("home" as string, "PUBLISHED");

  return {
    title: page?.title || "",
    description: page?.description || "",
    openGraph: {
      type: "website",
      title: page?.title || "",
      images: [page?.ogImage?.url || ""],
    },
    twitter: {
      card: "summary_large_image",
      title: page?.title || "",
      description: page?.description || "",
    },
  };
}

export default async function Home() {
  const { page }: PageQuery = await getPage("home", "PUBLISHED");

  return (
    <main className="max-w-screen-2xl mx-auto">
      <section className="mb-12">
        <ComponentRenderer data={page?.components} />
      </section>
    </main>
  );
}
