import Image from "next/image";

interface Props {
  __typename: string;
  title: string;
  image: {
    url: string;
  };
  url: string;
  cta: string;
}

export default function Card({ image, title, url, cta }: Props) {
  return (
    <div className="bg-tertiary aspect-[1/1] relative">
      <a className="block absolute w-full h-full top-0 left-0" href={url}>
        <Image
          src={image.url}
          alt={title}
          width={500}
          height={500}
          className="absolute w-full h-auto"
          sizes="100vw"
          loading="lazy"
        />

        <button className="cta absolute bottom-4 right-4">{cta}</button>
        <div className="absolute top-6 md:top-auto md:-bottom-6 left-8">
          <h3>
            <span className="block text-primary font-bold font-title text-4xl md:text-6xl">
              your
            </span>
            <span className="block text-dark font-bold font-title text-3xl sm:text-4xl md:text-6xl sm:ml-8 sm:-mt-2">
              {title}
            </span>
          </h3>
        </div>
      </a>
    </div>
  );
}
