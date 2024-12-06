async function getExtCode(id) {
    return await fetch(`/extensions/code/${id}.js`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            } else return response.text();
        })
        .then(data => {
            return data;
        })
        .catch(error => {
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
    fetch('/extensions/extensions.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            } else return response.json();
        })
        .then(data => {
            if (!data) throw new Error('Extensions data is empty');

            const gallery = document.getElementById('gallery');

            for (let i = 0; i < data.length; i++) {
                const ext = data[i];
                const newElement = document.createElement('div');
                newElement.id = ext.id;
                newElement.className = 'extension';

                let nameDiv = `<div id="name">
                <p>${ext.name}</p>`

                if (ext.canBeUsedOn.tw === true) {
                    nameDiv += `
                    <a href="https://turbowarp.org">
                      <img src = "/src/static/icons/tw.svg" alt = "TurboWarp" />
                    </a>`;
                }
                if (ext.canBeUsedOn.pm === true) {
                    nameDiv += `
                    <a href="https://penguinmod.com">
                      <img src="/src/static/icons/pm.svg" alt="PenguinMod" />
                    </a>`;
                }
                if (ext.unfinished === true) {
                    nameDiv += `
                    <a><img src="/src/static/icons/hammer.svg" alt="Unfinished, working on it" /></a>`
                }

                nameDiv += `
                </div>
                <p class="description">${ext.description}</p>`;

                newElement.innerHTML = `
                <img src="/extensions/thumbnail/${ext.id}.${ext.imgFormat ?? 'svg'}" alt="${ext.name}" id="thumbnail" />

                ${nameDiv}

                <div id="buttons">
                <button onclick="downloadExt('${ext.id}')">Download</button>
                <button onclick="copyExt('${ext.id}')">Copy</button>
                </div>`;

                gallery.appendChild(newElement);
            }
        })
        .catch(error => {
            console.error('Error fetching extensions:', error);
        });
});