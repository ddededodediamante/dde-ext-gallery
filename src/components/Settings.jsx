import { useRef, useEffect } from "preact/hooks";

export default function Settings({ open, settings, onClose, onSave, onSetMode }) {
  const bgRef = useRef();
  const fgRef = useRef();
  const borderRef = useRef();
  const fontRef = useRef();
  const radiusRef = useRef();

  useEffect(() => {
    if (open && bgRef.current) {
      bgRef.current.value = settings.background || "#23272e";
      fgRef.current.value = settings.foreground || "#1c1f25";
      borderRef.current.value = settings.border || "#3a3e47";
      fontRef.current.value = settings.font || "#ffffff";
      radiusRef.current.value = settings.borderRadius || "10";
    }
  }, [open, settings]);

  const handleSave = () => {
    onSave({
      background: bgRef.current.value,
      foreground: fgRef.current.value,
      border: borderRef.current.value,
      font: fontRef.current.value,
      borderRadius: radiusRef.current.value,
    });
  };

  if (!open) return null;

  return (
    <div id="settings">
      <div id="settingsContent">
        <button onClick={onClose} style="position: absolute; top: 10px; right: 10px;">
          X
        </button>

        <h2>Settings</h2>

        <label>
          Background Color: <input type="color" ref={bgRef} />
        </label>
        <label>
          Foreground Color: <input type="color" ref={fgRef} />
        </label>
        <label>
          Border Color: <input type="color" ref={borderRef} />
        </label>
        <label>
          Font Color: <input type="color" ref={fontRef} />
        </label>
        <label>
          Border Radius:{" "}
          <input type="number" ref={radiusRef} min="0" max="20" />
        </label>

        <div className="inline" style="gap: 10px">
          <button onClick={handleSave}>Save</button>
          <button onClick={() => onSetMode("dark")}>Dark Mode</button>
          <button onClick={() => onSetMode("light")}>Light Mode</button>
        </div>
      </div>
    </div>
  );
}
