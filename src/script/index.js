async function getExtCode(id) {
  return await fetch(`/extensions/code/${id}.js`)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      } else return response.text();
    })
    .then((data) => {
      return data;
    })
    .catch((error) => {
      console.error(`Error fetching extension ${id}:`, error);
      return null;
    });
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
  await navigator.clipboard.writeText(`${window.location.origin}/extensions/code/${id}.js`);
}

document.addEventListener("DOMContentLoaded", function () {
  let extensions = [];

  fetch("/extensions/extensions.json")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      } else return response.json();
    })
    .then((data) => {
      if (!data) throw new Error("Extensions data is empty");

      extensions = data;

      renderExtensions(extensions);
    })
    .catch((error) => {
      console.error("Error fetching extensions:", error);
    });

  function renderExtensions(extList) {
    const gallery = document.getElementById("gallery");
    gallery.innerHTML = "";

    if (extList?.length === 0) {
      return (gallery.innerHTML = `<h2>No extensions found.</h2>`);
    }

    extList.forEach((ext) => {
      if (ext?.hidden == true) return;

      const newElement = document.createElement("div");
      newElement.id = ext.id;
      newElement.className = "extension";

      let nameDiv = `<div id="name">\n<p>${ext.name}</p>`;

      if (ext.canBeUsedOn.tw === true) {
        nameDiv += `
          <button onclick="window.open('https://turbowarp.org', '_blank')">
          <img src = "/src/static/icons/tw.svg" alt = "TurboWarp" />
          </button>`;
      }
      if (ext.canBeUsedOn.pm === true) {
        nameDiv += `
          <button onclick="window.open('https://penguinmod.com', '_blank')">
          <img src="/src/static/icons/pm.svg" alt="PenguinMod" />
          </button>`;
      }
      if (ext.unfinished === true) {
        nameDiv += `
          <button disabled title="Work in progress">
          <img src="/src/static/icons/hammer.svg" />
          </button>`;
      }

      nameDiv += `</div>
      <p class="description">${ext.description}</p>`;

      newElement.innerHTML = `
      <div class="thumbnail-wrapper">
        <img src="/extensions/thumbnail/${ext.id}.${ext.imgFormat ?? "svg"}" alt="${ext.name}" id="thumbnail" />
        <div id="buttons">
          <button onclick="downloadExt('${ext.id}')">Download</button>
          <button onclick="copyExt('${ext.id}')">Copy</button>
          <button onclick="copyUrlExt('${ext.id}')">URL</button>
        </div>
      </div>

      ${nameDiv}`;

      gallery.appendChild(newElement);
    });
  }

  window.filterExtensions = function () {
    const query = document.getElementById("search-bar").value.toLowerCase().trim();

    renderExtensions(
      extensions.filter(
        (ext) =>
          ext.name.toLowerCase().includes(query) ||
          ext.description.toLowerCase().includes(query) ||
          (ext?.tags ?? []).includes(query)
      )
    );
  };
});

/* Button Functions */

const backgroundPicker = document.getElementById("backgroundPicker");
const foregroundPicker = document.getElementById("foregroundPicker");
const fontPicker = document.getElementById("fontPicker");
const borderPicker = document.getElementById("borderPicker");
const borderRadiusPicker = document.getElementById("borderRadiusPicker");
const settings = document.getElementById("settings");
const documentStyle = document.documentElement.style;

function openSettings() {
  settings.style.display = "block";
}

function closeSettings() {
  settings.style.display = "none";
}

function saveSettings() {
  ["background", "foreground", "font", "border", "borderRadius"].forEach((k) =>
    localStorage.setItem(k, (window[k + "Picker"].value || "").toString())
  );
  loadSettings();
}

function loadSettings(settings) {
  settings = settings ?? {
    background: localStorage.getItem("background") || "#23272e",
    foreground: localStorage.getItem("foreground") || "#1c1f25",
    border: localStorage.getItem("border") || "#3a3e47",
    font: localStorage.getItem("font") || "#ffffff",
    borderRadius: localStorage.getItem("borderRadius") || "10",
  };

  for (let i in settings) {
    let value = settings[i];
    documentStyle.setProperty(
      `--${i}`,
      i === "borderRadius" ? value + 'px' : value
    );
    window[i + "Picker"].value = value;
  }
}

const modes = {
  dark: {
    background: "#23272e",
    foreground: "#1c1f25",
    border: "#3a3e47",
    font: "#ffffff",
  },
  light: {
    background: "#ffffff",
    foreground: "#ececec",
    border: "#cfcfcf",
    font: "#000000",
  },
};

function setMode(mode) {
  Object.entries(modes[mode]).forEach(([k, v]) => localStorage.setItem(k, v));
  loadSettings();
}

loadSettings();
