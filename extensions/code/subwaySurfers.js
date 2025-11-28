(function (Scratch) {
  // Made by ddededodediamante

  if (!Scratch.extensions.unsandboxed) {
    throw new Error("Extension must run unsandboxed!");
  }

  class Extension {
    constructor() {
      this.dvdEnabled = false;
      this.dvdSpeed = 3;
      this.dvdVX = dvdSpeed;
      this.dvdVY = dvdSpeed;
    }

    getInfo() {
      return {
        id: "ddeSubwaySurfers",
        name: "Subway Surfers",
        color1: "#737FFF",
        blocks: [
          {
            opcode: "setDVDBounce",
            blockType: Scratch.BlockType.COMMAND,
            text: "set DVD bounce to [STATE]",
            arguments: {
              STATE: {
                type: Scratch.ArgumentType.STRING,
                menu: "onOffMenu",
              },
            },
          },
          {
            opcode: "setthis.dvdSpeed",
            blockType: Scratch.BlockType.COMMAND,
            text: "set DVD speed to [SPEED]",
            arguments: {
              SPEED: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 3,
              },
            },
          },
        ],
        menus: {
          onOffMenu: {
            acceptReporters: true,
            items: ["true", "false"],
          },
        },
      };
    }

    setDVDBounce({ STATE }) {
      dvdEnabled = Scratch.Cast.toBoolean(STATE);
    }

    setdvdSpeed({ SPEED }) {
      const speed = Scratch.Cast.toNumber(SPEED);

      this.dvdSpeed = Math.max(0, speed);

      this.dvdVX = this.dvdVX >= 0 ? this.dvdSpeed : -this.dvdSpeed;
      this.dvdVY = this.dvdVY >= 0 ? this.dvdSpeed : -this.dvdSpeed;
    }
  }

  const video = document.createElement("video");
  video.src = "https://files.catbox.moe/go1vik.mp4";
  video.autoplay = true;
  video.loop = true;
  video.volume = 2;
  video.style.position = "fixed";
  video.style.zIndex = "696969696969";
  video.style.width = "30%";
  video.style.height = "auto";
  document.body.appendChild(video);

  window._mouseX = 0;
  window._mouseY = 0;

  document.addEventListener("mousemove", (e) => {
    window._mouseX = e.clientX;
    window._mouseY = e.clientY;
  });

  function moveRandomly() {
    const mouse = { x: window._mouseX, y: window._mouseY };

    let randomX, randomY;
    let tries = 0;

    do {
      randomX = Math.floor(
        Math.random() * (window.innerWidth - video.offsetWidth)
      );
      randomY = Math.floor(
        Math.random() * (window.innerHeight - video.offsetHeight)
      );
      tries++;
      if (tries > 50) break;
    } while (
      mouse.x >= randomX &&
      mouse.x <= randomX + video.offsetWidth &&
      mouse.y >= randomY &&
      mouse.y <= randomY + video.offsetHeight
    );

    video.style.left = `${randomX}px`;
    video.style.top = `${randomY}px`;
  }

  video.addEventListener("mouseenter", () => {
    if (!dvdEnabled) moveRandomly();
  });

  const move = () => {
    if (!dvdEnabled) {
      moveRandomly();
    }
    setTimeout(
      move,
      Math.floor(Math.random() * (25_000 - 15_000 + 1)) + 15_000
    );
  };
  move();

  function dvdLoop() {
    if (dvdEnabled) {
      let x = parseFloat(video.style.left || 0);
      let y = parseFloat(video.style.top || 0);

      x += this.dvdVX;
      y += this.dvdVY;

      if (x <= 0 || x + video.offsetWidth >= window.innerWidth) {
        this.dvdVX *= -1;
      }

      if (y <= 0 || y + video.offsetHeight >= window.innerHeight) {
        this.dvdVY *= -1;
      }

      video.style.left = `${x}px`;
      video.style.top = `${y}px`;
    }

    requestAnimationFrame(dvdLoop);
  }
  dvdLoop();

  Scratch.extensions.register(new Extension());
})(Scratch);
