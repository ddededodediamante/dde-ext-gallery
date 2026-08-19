export default function SearchBar({ query, onInput, onOpenSettings }) {
  return (
    <div id="search-container">
      <input
        type="text"
        id="search-bar"
        placeholder="Search extensions..."
        onInput={(e) => onInput(e.target.value.toLowerCase().trim())}
        value={query}
      />
      <button onClick={onOpenSettings}>Settings</button>
    </div>
  );
}
