import Card from "./Card";

interface Props {
  __typename: string;
  title: string;
  relatedProductList: {
    relatedProducts: {
      products: [
        {
          title: string;
          image: {
            url: string;
          };
          url: string;
          cta: string;
        }
      ];
    };
  };
}

export default function ProductList({
  __typename,
  title,
  relatedProductList,
}: Props) {
  const products = relatedProductList?.relatedProducts?.products.map(
    (product: any) => {
      return {
        id: product.id,
        image: {
          url: product.images[0].url,
        },
        title: product.name,
        slug: product.slug,
      };
    }
  );

  return (
    <section className="bg-tertiary">
      {title ? (
        <h3 className="text-5xl pt-12 mb-12 font-bold font-title text-center">
          {title}
        </h3>
      ) : null}

      <div className="grid gap-6 mx-12 pb-32 md:grid-cols-2 lg:gap-12">
        {products &&
          products.map((product) => {
            return (
              <Card
                key={product.id}
                __typename={__typename}
                image={product.image}
                title={product.title}
                url={`/pdp/${product.slug}`}
                cta="BUY NOW"
              />
            );
          })}
      </div>
    </section>
  );
}
