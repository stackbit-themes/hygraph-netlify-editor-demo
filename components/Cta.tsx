interface Props {
  __typename: string;
  chapeau: string;
  title: string;
  description: string;
  url: string;
  cta: string;
}

export default function Cta({ chapeau, title, description, url, cta }: Props) {
  return (
    <div className="w-full mb-12 bg-tertiary p-8">
      <h3 className="mb-8">
        {chapeau ? (
          <span className="block text-primary font-bold font-title text-4xl md:text-6xl">
            {chapeau}
          </span>
        ) : null}

        {title ? (
          <span className="block text-dark font-bold font-title text-3xl sm:text-4xl md:text-6xl sm:ml-8 sm:-mt-2">
            {title}
          </span>
        ) : null}
      </h3>

      {description ? (
        <p className="text-xl sm:ml-8 mb-8">{description}</p>
      ) : null}

      {url ? (
        <a className="inline-block cta ml-8" href={url}>
          {cta}
        </a>
      ) : null}
    </div>
  );
}
