interface Props {
  __typename: string;
  text: string;
  index: number;
}

export default function TutorialItem({ text, index }: Props) {
  return (
    <li
      className="grid mb-12 items-center"
      style={{ gridTemplateColumns: "1fr 5fr" }}
    >
      <span className="text-6xl font-bold font-title text-primary">
        {index + 1}.
      </span>
      <span className="text-md">{text}</span>
    </li>
  );
}
