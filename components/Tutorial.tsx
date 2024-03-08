import Image from "next/image";
import ComponentRenderer from "@/components/ComponentRenderer";

interface Props {
  __typename: string;
  title: string;
  image: {
    url: string;
  };

  items: [
    {
      __typename: string;
      text: string;
      index: number;
    }
  ];
}

type TutorialItem = {
  __typename: string;
  text: string;
  index: number;
};

export default function Tutorial({ title, image, items }: Props) {
  const tutorialItems: TutorialItem[] = [];

  items.forEach((item, index) => {
    tutorialItems.push({ ...item, index });
  });

  return (
    <section className="relative">
      <Image
        src={image.url}
        alt={title}
        width={1440}
        height={532}
        className="absolute h-full w-full object-cover"
        sizes="100vw"
        loading="lazy"
      />

      <div className="max-w-2xl px-12 py-24 md:px-24 md:py-36 relative">
        <h1 className="text-6xl font-bold mb-12 text-primary">{title}</h1>

        <ul>
          <ComponentRenderer data={tutorialItems} />
        </ul>
      </div>
    </section>
  );
}
