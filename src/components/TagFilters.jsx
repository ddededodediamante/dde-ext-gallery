import Collapsible from "./Collapsible";

export default function TagFilters({ tags, checked, onChange }) {
  const toggle = value => {
    onChange(prev =>
      prev.includes(value) ? prev.filter(p => p !== value) : [...prev, value]
    );
  };

  return (
    <Collapsible title={"Filter by tags"} className="grid-two">
      {tags.map(value => (
        <label className="platform-checkbox" key={value}>
          <input
            type="checkbox"
            value={value}
            checked={checked.includes(value)}
            onChange={() => toggle(value)}
          />
          <span>{value}</span>
        </label>
      ))}
    </Collapsible>
  );
}
