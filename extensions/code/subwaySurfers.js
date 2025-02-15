(function (Scratch) {
  // Made by ddededodediamante

  if (!Scratch.extensions.unsandboxed) {
    throw new Error('Extension must run unsandboxed!');
  }

  class extension {
    getInfo() {
      return {
        id: 'ddeSubwaySurfers',
        name: 'Subway Surfers',
        color1: '#737FFF',
        blocks: [],
      };
    }
  }

  const video = document.createElement('video');
  video.src = 'https://files.catbox.moe/77br5a.mp4';
  video.autoplay = true;
  video.loop = true;
  video.currentTime = 14;
  video.style.position = 'fixed';
  video.style.zIndex = '999999';
  video.style.width = '30%';
  video.style.height = 'auto';

  document.body.appendChild(video);

  function moveRandomly() {
    const randomX = Math.floor(
      Math.random() * (window.innerWidth - video.offsetWidth)
    );
    const randomY = Math.floor(
      Math.random() * (window.innerHeight - video.offsetHeight)
    );
    video.style.left = `${randomX}px`;
    video.style.top = `${randomY}px`;
  }

  video.addEventListener('mouseenter', () => {
    moveRandomly();
  });

  setInterval(moveRandomly, 25_000);

  Scratch.extensions.register(new extension());
})(Scratch);