import Image from "next/image";

interface Props {
  __typename: string;
  title: string;
  chapeau: string;
  description: string;
  cta: string;
  url: string;
  image: {
    url: string;
  };
}

export default function Routine({
  chapeau,
  cta,
  url,
  title,
  description,
  image,
}: Props) {
  return (
    <section className="py-16 relative bg-light">
      <Image
        src={image.url}
        alt={title}
        width={768}
        height={510}
        className="lg:w-2/4"
        sizes="100vw"
        loading="lazy"
      />

      <div className="w-full bg-tertiary p-8 lg:max-w-2xl lg:absolute top-32 right-32">
        <h2 className="mb-8 font-title">
          {chapeau ? (
            <span className="block text-primary font-bold text-4xl lg:text-6xl">
              {chapeau}
            </span>
          ) : null}

          {title ? (
            <span className="block text-dark font-bold text-4xl lg:text-6xl ml-8 -mt-2">
              {title}
            </span>
          ) : null}
        </h2>

        {description ? (
          <p className="text-xl ml-8 mb-8">{description}</p>
        ) : null}

        {url ? (
          <a href={url} className="inline-block cta ml-8">
            {cta}
          </a>
        ) : null}
      </div>
    </section>
  );
}
