export default function ImagePlaceholder({
  commandParameters,
}: {
  commandParameters: string[];
}) {
  return (
    <div className="absolute bottom-5">
      <img
        alt="random"
        src={"https://picsum.photos/200?v=" + commandParameters[0]}
      />
    </div>
  );
}
