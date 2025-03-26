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
  await navigator.clipboard.writeText(
    `${window.location.origin}/extensions/code/${id}.js`
  );
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
        <img src="/extensions/thumbnail/${ext.id}.${
        ext.imgFormat ?? "svg"
      }" alt="${ext.name}" id="thumbnail" />
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
    const query = document
      .getElementById("search-bar")
      .value.toLowerCase()
      .trim();

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
const settings = document.getElementById("settings");
const documentStyle = document.documentElement.style;

function openSettings() {
  settings.style.display = 'block';
}

function closeSettings() {
  settings.style.display = 'none';
}

function saveSettings() {
  const background = backgroundPicker.value;
  const foreground = foregroundPicker.value;
  const font = fontPicker.value;
  const border = borderPicker.value;

  localStorage.setItem("background", background);
  localStorage.setItem("foreground", foreground);
  localStorage.setItem("font", font);
  localStorage.setItem("border", border);

  documentStyle.setProperty("--background", background);
  documentStyle.setProperty("--foreground", foreground);
  documentStyle.setProperty("--border", border);
  documentStyle.setProperty("--font", font);
}

function loadSettings() {
  const background = localStorage.getItem("background") || "#23272e";
  const foreground = localStorage.getItem("foreground") || "#1c1f25";
  const border = localStorage.getItem("border") || "#3a3e47";
  const font = localStorage.getItem("font") || "#ffffff";

  documentStyle.setProperty("--background", background);
  documentStyle.setProperty("--foreground", foreground);
  documentStyle.setProperty("--border", border);
  documentStyle.setProperty("--font", font);

  backgroundPicker.value = background;
  foregroundPicker.value = foreground;
  fontPicker.value = font;
  borderPicker.value = border;
}

loadSettings();

function setDarkMode() {
  localStorage.setItem("background", "#23272e");
  localStorage.setItem("foreground", "#1c1f25");
  localStorage.setItem("border", "#3a3e47");
  localStorage.setItem("font", "#ffffff");
  
  loadSettings();
}

function setLightMode() {
  localStorage.setItem("background", "#ffffff");
  localStorage.setItem("foreground", "#ececec");
  localStorage.setItem("border", "#cfcfcf");
  localStorage.setItem("font", "#000000");
  
  loadSettings();
}