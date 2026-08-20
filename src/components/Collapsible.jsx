import { useState } from "react";

function Caret({ style }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="24" style={style}>
      <path
        fill="var(--font)"
        stroke="var(--font)"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-miterlimit="10"
        stroke-width="5"
        d="M4 4l8 8-8 8Z"
      />
    </svg>
  );
}

export default function Collapsible({ title, className, children }) {
  const [collapsed, setCollapsed] = useState(true);

  return (
    <div className="column collapsible">
      <button onClick={() => setCollapsed(!collapsed)}>
        {title} <Caret style={{ rotate: collapsed ? "0deg" : "90deg" }} />
      </button>
      {!collapsed && (
        <div className={`column collapsible-content ${className || ""}`}>{children}</div>
      )}
    </div>
  );
}
