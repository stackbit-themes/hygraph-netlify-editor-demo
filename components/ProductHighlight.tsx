import Image from "next/image";

interface Props {
  __typename: string;
  productFocus: {
    image: {
      url: string;
    };
    title: string;
    description: string;
    url: string;
    cta: string;
  };
}
export default function ProductHighlight({ productFocus }: Props) {
  return (
    <section className="md:aspect-[1440/722] relative">
      <Image
        src={productFocus.image.url}
        alt={productFocus.title}
        width={2880}
        height={1446}
        className="md:absolute md:object-cover"
        sizes="100vw"
        loading="lazy"
      />

      <div className="p-8 md:p-0 md:max-w-md lg:max-w-2xl md:absolute md:top-24 lg:top-56 md:right-16 lg:right-44">
        <h2 className="mb-8">
          <span className="block text-primary font-bold font-title text-4xl md:text-6xl">
            your
          </span>
          <span className="font-bold font-title text-3xl sm:text-4xl md:text-6xl sm:ml-8 sm:-mt-2 block md:right-16 lg:right-44">
            {productFocus.title}
          </span>
        </h2>

        {productFocus.description ? (
          <p
            className="text-xl ml-8 mb-8 text-dark"
            dangerouslySetInnerHTML={{ __html: productFocus.description }}
          />
        ) : null}

        {productFocus.url ? (
          <a className="inline-block cta ml-8" href={productFocus.url}>
            {productFocus.cta}
          </a>
        ) : null}
      </div>
    </section>
  );
}
