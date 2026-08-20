const PLATFORM_LINKS = {
  tw: {
    url: "https://turbowarp.org",
    icon: "/icons/tw.svg",
    alt: "TurboWarp",
    title: "TurboWarp"
  },
  pm: {
    url: "https://penguinmod.com",
    icon: "/icons/pm.svg",
    alt: "PenguinMod",
    title: "PenguinMod"
  },
  nb: {
    url: "https://nitrobolt.org",
    icon: "/icons/nb.svg",
    alt: "NitroBolt",
    title: "NitroBolt"
  }
};

async function getExtCode(id) {
  try {
    const response = await fetch(`/extensions/code/${id}.js`);
    if (!response.ok) throw new Error("Network response was not ok");
    return await response.text();
  } catch (error) {
    console.error(`Error fetching extension ${id}:`, error);
    return null;
  }
}

async function downloadExt(id) {
  const data = await getExtCode(id);
  const blob = new Blob([data], { type: "text/javascript" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${id}.js`;
  document.body.appendChild(a);
  a.click();
  URL.revokeObjectURL(url);
  document.body.removeChild(a);
}

async function copyExt(id) {
  const data = await getExtCode(id);
  await navigator.clipboard.writeText(data);
}

async function copyUrlExt(id) {
  await navigator.clipboard.writeText(
    `${window.location.origin}/extensions/code/${id}.js`
  );
}

export default function ExtensionCard({ ext }) {
  const imgFormat = ext.imgFormat ?? "svg";

  return (
    <div className="extension" id={ext.id}>
      <div className="thumbnail-wrapper">
        <img
          src={`/extensions/thumbnail/${ext.id}.${imgFormat}`}
          alt={ext.name}
          className="thumbnail"
        />
        <div className="buttons">
          <div className="row">
            <button onClick={() => downloadExt(ext.id)}>Download</button>
            <button onClick={() => copyExt(ext.id)}>Copy</button>
            <button onClick={() => copyUrlExt(ext.id)}>URL</button>
          </div>
          <div className="row">
            {Object.entries(PLATFORM_LINKS).map(([key, { url, icon, alt, title }]) =>
              ext.canBeUsedOn[key] ? (
                <button
                  className="platform-btn"
                  key={key}
                  onClick={() => window.open(url, "_blank")}
                >
                  <img src={icon} alt={alt} title={title} />
                </button>
              ) : null
            )}
          </div>
        </div>
      </div>

      <div className="name">
        <p className="title">
          {ext.name}
          {ext.deprecated && (
            <img src="/icons/headstone.svg" alt="Deprecated" className="ext-icon" />
          )}
          {ext.updated && (
            <img src="/icons/sparkles.svg" alt="Updated" className="ext-icon" />
          )}
        </p>
        <p className="description">{ext.description}</p>
      </div>
    </div>
  );
}
