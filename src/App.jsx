import { useState, useEffect } from "preact/hooks";
import Settings from "./components/Settings";
import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import PlatformFilters from "./components/PlatformFilters";
import TagFilters from "./components/TagFilters";
import Gallery from "./components/Gallery";
import Footer from "./components/Footer";

const MODES = {
  dark: {
    background: "#23272e",
    foreground: "#1c1f25",
    border: "#3a3e47",
    font: "#ffffff"
  },
  light: {
    background: "#ffffff",
    foreground: "#ececec",
    border: "#cfcfcf",
    font: "#000000"
  }
};

function loadSettings() {
  const s = {
    background: localStorage.getItem("background") || "#23272e",
    foreground: localStorage.getItem("foreground") || "#1c1f25",
    border: localStorage.getItem("border") || "#3a3e47",
    font: localStorage.getItem("font") || "#ffffff",
    borderRadius: localStorage.getItem("borderRadius") || "10"
  };

  const root = document.documentElement.style;
  for (const [key, value] of Object.entries(s)) {
    root.setProperty(`--${key}`, key === "borderRadius" ? value + "px" : value);
  }
  return s;
}

export default function App() {
  const [extensions, setExtensions] = useState([]);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [settings, setSettings] = useState({});

  const [query, setQuery] = useState("");
  const [checkedPlatforms, setCheckedPlatforms] = useState([]);
  const [checkedTags, setCheckedTags] = useState([]);

  useEffect(() => {
    setSettings(loadSettings());

    fetch("/extensions/extensions.json")
      .then(r => {
        if (!r.ok) throw new Error("Network response was not ok");
        return r.json();
      })
      .then(data => {
        if (!data) throw new Error("Extensions data is empty");
        setExtensions(data);
      })
      .catch(e => console.error("Error fetching extensions:", e));
  }, []);

  function matchesQuery(ext) {
    if (!query) return true;
    const q = query.toLowerCase();
    return (
      ext.name.toLowerCase().includes(q) ||
      ext.description.toLowerCase().includes(q) ||
      (ext.tags ?? []).some(t => t.toLowerCase().includes(q)) ||
      (ext.extraTags ?? []).some(t => t.toLowerCase().includes(q))
    );
  }

  function matchesPlatforms(ext) {
    return (
      checkedPlatforms.length === 0 || checkedPlatforms.some(i => ext.canBeUsedOn[i])
    );
  }

  function matchesTags(ext) {
    return checkedTags.length === 0 || checkedTags.some(i => ext.tags.includes(i));
  }

  const filtered = extensions.filter(
    ext => !ext.hidden && matchesQuery(ext) && matchesPlatforms(ext) && matchesTags(ext)
  );
  const allTags = [...new Set(extensions.flatMap(item => item.tags))];

  const handleSaveSettings = newValues => {
    Object.entries(newValues).forEach(([k, v]) => localStorage.setItem(k, v.toString()));
    setSettings(loadSettings());
  };

  const handleSetMode = mode => {
    Object.entries(MODES[mode]).forEach(([k, v]) => localStorage.setItem(k, v));
    setSettings(loadSettings());
  };

  return (
    <>
      <Settings
        open={settingsOpen}
        settings={settings}
        onClose={() => setSettingsOpen(false)}
        onSave={handleSaveSettings}
        onSetMode={handleSetMode}
      />

      <Header />

      <SearchBar
        query={query}
        onInput={setQuery}
        onOpenSettings={() => setSettingsOpen(true)}
      />

      <div class="row">
        <PlatformFilters checked={checkedPlatforms} onChange={setCheckedPlatforms} />
        <TagFilters tags={allTags} checked={checkedTags} onChange={setCheckedTags} />
      </div>

      <Gallery extensions={filtered} />

      <Footer />
    </>
  );
}
