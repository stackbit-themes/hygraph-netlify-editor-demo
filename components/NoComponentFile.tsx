interface Props {
  __typename: string;
}

export default function NoComponentFile({ __typename, ...rest }: Props) {
  return (
    <div className="bg-red-200 text-red-800 p-4 mb-4 border-4 border-red-400 overflow-auto m-8">
      <p className="mb-4">
        No Component file or wrong name in CMS for
        <strong>{__typename}</strong>
      </p>
      <p>Props:</p>
      <pre>{JSON.stringify(rest, null, 2)}</pre>
    </div>
  );
}
