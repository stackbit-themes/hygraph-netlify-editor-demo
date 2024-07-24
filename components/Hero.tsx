import Image from "next/image";

interface Props {
  __typename: string;
  index: number;
  description: string;
  image: {
    url: string;
  };
  title: string;
}

export default function Hero({ description, image, title, index }: Props) {
  return (
      <section className="md:aspect-[1440/632] relative" data-sb-field-path={`.${index}`}>
      {image && <Image
        src={image.url}
        alt={title}
        width={1440}
        height={532}
        className="md:absolute w-full"
        sizes="100vw"
        loading="eager"
      />}
      <div className="p-8 md:p-0 md:absolute md:max-w-md lg:max-w-xl md:top-28 md:left-12 lg:top-44 lg:left-56">
        <h1 className="font-title font-bold text-4xl sm:text-6xl mb-8 xl:text-7xl 2xl:text-8xl" data-sb-field-path=".title">
          {/\byour\b/.test(title) ? [
            title.split("your")[0],
            <span className="text-primary">your</span>,
            title.split("your")[1]
          ] : title}
        </h1>
        <p v-if="description" className="text-xl" data-sb-field-path=".description">
          {description}
        </p>
      </div>
    </section>
  );
}
