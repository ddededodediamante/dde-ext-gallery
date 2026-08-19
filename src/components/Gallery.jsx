import ExtensionCard from "./ExtensionCard";

export default function Gallery({ extensions }) {
  if (extensions.length === 0) {
    return <h2>No extensions found.</h2>;
  }

  return (
    <div id="gallery">
      {extensions.map((ext) => (
        <ExtensionCard key={ext.id} ext={ext} />
      ))}
    </div>
  );
}
