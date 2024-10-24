import Image from "next/image";
import ComponentRenderer from "@/components/ComponentRenderer";

interface Props {
  __typename: string;
  index: number;
  image: {
    url: string;
  };
  components: any;
}

export default function Editorial({ image, components, index }: Props) {
  return (
    <section className="flex flex-col lg:flex-row bg-light justify-between p-8 lg:p-12" data-sb-field-path={`.${index}`}>
      <div className="flex flex-col items-stretch w-full lg:w-2/4" data-sb-field-path=".components">
        <ComponentRenderer data={components} />
      </div>
      <Image
        src={image.url}
        alt="Editorial Image"
        width={1000}
        height={1504}
        className="w-full lg:w-2/4 mt-8 lg:mt-0 lg:ml-12 object-cover"
        sizes="50vw"
        loading="eager"
        data-sb-field-path=".image"
      />
    </section>
  );
}
