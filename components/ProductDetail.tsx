import Image from "next/image";

interface Props {
  product: {
    id: string;
    slug: string;
    name: string;
    price: string;
    ingredients: string;
    shortDescription: string;
    description: string;
    stock: string;
    images: [
      {
        alt: string;
        url: string;
      }
    ];
  };
}

export default function ProductDetail({ product }: Props) {
  return (
    <section className="bg-light product-detail pb-12">
      <div className="grid grid-cols-2">
        {product.images.map((img: any) => {
          return (
            <Image
              src={img.url}
              alt={img.alt}
              width={1440}
              height={532}
              className="aspect-[1/1] object-cover"
              sizes="50vw"
              loading="eager"
              key={img.url}
            />
          );
        })}
      </div>
      <div className="flex flex-col md:flex-row mx-4 lg:mx-16 mb-12">
        <div className="bg-secondary p-8 md:-mt-12 flex-1 w-full md:w-2/4">
          <h1>
            <span className="block text-primary font-bold font-title text-6xl">
              your
            </span>
            <span className="block text-dark font-bold font-title text-6xl ml-8 -mt-2">
              {product.name}
            </span>
          </h1>
        </div>
        <div className="bg-tertiary p-8 md:-mt-12 w-full md:w-2/4">
          <p className="text-5xl font-bold font-title mb-4">${product.price}</p>
          <a href="#" className="cta" target="_blank">
            add to cart
          </a>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mx-8 md:mx-16">
        <div className="pr-2">
          <h2 className="text-3xl font-bold font-title mb-4">
            product description
          </h2>
          <article dangerouslySetInnerHTML={{ __html: product.description }} />
        </div>
        <div className="pl-2">
          <h3 className="text-3xl font-bold font-title mb-4">ingredients</h3>
          <article dangerouslySetInnerHTML={{ __html: product.ingredients }} />
        </div>
      </div>
    </section>
  );
}
