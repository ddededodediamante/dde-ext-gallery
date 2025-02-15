async function getExtCode(id) {
  return await fetch(`/extensions/code/${id}.js`)
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
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

  const blob = new Blob([data], { type: 'text/javascript' });
  const url = URL.createObjectURL(blob);

  const a = document.createElement('a');
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

document.addEventListener('DOMContentLoaded', function () {
  let extensions = [];

  fetch('/extensions/extensions.json')
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      } else return response.json();
    })
    .then((data) => {
      if (!data) throw new Error('Extensions data is empty');

      extensions = data;

      renderExtensions(extensions);
    })
    .catch((error) => {
      console.error('Error fetching extensions:', error);
    });

  function renderExtensions(extList) {
    const gallery = document.getElementById('gallery');
    gallery.innerHTML = '';

    if (extList?.length === 0) {
      return gallery.innerHTML = `<h2>No extensions found.</h2>`;
    }

    extList.forEach((ext) => {
      const newElement = document.createElement('div');
      newElement.id = ext.id;
      newElement.className = 'extension';

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

      newElement.innerHTML = `<img src="/extensions/thumbnail/${ext.id}.${
        ext.imgFormat ?? 'svg'
      }" alt="${ext.name}" id="thumbnail" />

      ${nameDiv}

      <div id="buttons">
      <button onclick="downloadExt('${ext.id}')">Download</button>
      <button onclick="copyExt('${ext.id}')">Copy</button>
      </div>`;

      gallery.appendChild(newElement);
    });
  }

  window.filterExtensions = function () {
    const query = document
      .getElementById('search-bar')
      .value.toLowerCase().trim();
    
    renderExtensions(
      extensions.filter(
        ext =>
          ext.name.toLowerCase().includes(query) ||
          ext.description.toLowerCase().includes(query) ||
          (ext?.tags ?? []).includes(query)
      )
    );
  };
});
