import Collapsible from "./Collapsible";

const PLATFORMS = [
  { value: "tw", label: "TurboWarp", icon: "/icons/tw.svg" },
  { value: "pm", label: "PenguinMod", icon: "/icons/pm.svg" },
  { value: "nb", label: "NitroBolt", icon: "/icons/nb.svg" }
];

export default function PlatformFilters({ checked, onChange }) {
  const toggle = value => {
    onChange(prev =>
      prev.includes(value) ? prev.filter(p => p !== value) : [...prev, value]
    );
  };

  return (
    <Collapsible title={"Filter by platform"}>
      {PLATFORMS.map(({ value, label, icon }) => (
        <label className="platform-checkbox" key={value}>
          <input
            type="checkbox"
            value={value}
            checked={checked.includes(value)}
            onChange={() => toggle(value)}
          />
          <img src={icon} alt={label} />
          <span>{label}</span>
        </label>
      ))}
    </Collapsible>
  );
}
