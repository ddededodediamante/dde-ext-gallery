(async function (Scratch) {
  "use strict";

  if (!Scratch.extensions.unsandboxed)
    throw new Error("This extension must run unsandboxed!");

  function sumToTranslate(path, dx = 0, dy = 0) {
    if (!path) return;

    let transform = path.getAttribute("transform") || "";

    let match = transform.match(/translate\(([^)]+)\)/);
    if (match) {
      let [x, y] = match[1].split(/\s*,\s*|\s+/).map(Number);
      x += dx;
      y += dy;
      transform = transform.replace(match[0], `translate(${x} ${y})`);
    } else {
      transform += ` translate(${dx} ${dy})`;
    }

    path.setAttribute("transform", transform.trim());
  }

  // Thanks sharkpool for original patch!
  if (Scratch.gui)
    Scratch.gui.getBlockly().then((SB) => {
      const buttocks = (width, height) => {
        width -= 18;
        height /= 2;
        return `M 9 0 a 1 1 0 0 0 0 ${height} a 1 1 0 0 0 0 ${height} h ${width} a 1 1 0 0 0 0 -${height} a 1 1 0 0 0 0 -${height} h -${width} z`;
      };

      const octagon = (width, height) => {
        width -= 18;
        return `M 9 0 l -10 10 v ${height - 20} l 10 10 h ${width} l 10 -10 v -${height - 20
          } l -10 -10 h -${width} z`;
      };

      const roundPuzzle = (width, height) => {
        height -= 20;
        height /= 2;
        width -= 20;
        return `M 20 0 q -10 0 -10 ${height} q -10 0 -10 10 q 0 10 10 10 q 0 ${height} 10 ${height} H ${width} q 10 0 10 -${height} q 10 0 10 -10 q 0 -10 -10 -10 q 0 -${height} -10 -${height} H 20 Z`;
      };

      const frameAdapter = (width, height) => {
        return `M 1 0 c 0 2.2 1.8 4 4 4 h 20 c 2 0 3 1 4 2 l 4 4 c 1 1 2 2 4 2 h 12 c 2 0 3 -1 4 -2 l 4 -4 c 1 -1 2 -2 4 -2 h 91.4 c 2.2 0 4 -1.8 4 -4 v -40 c 0 -2.2 -1.8 -4 -4 -4 h -3.8 c -2.2 0 -4 1.8 -4 4 v 28.2 c 0 2.2 -1.8 4 -4 4 h -123.6 c -2.2 0 -4 -1.8 -4 -4 v -28.2 c 0 -2.2 -1.8 -4 -4 -4 h -1.6 c 0 0 0 0 0 0 h -2.3 c -2.2 0 -4 1.8 -4 4 Z`;
      }

      const ogRender = SB.BlockSvg.prototype.render;
      SB.BlockSvg.prototype.render = function (...args) {
        const data = ogRender.call(this, ...args);

        if (this?.svgPath_ && this?.type?.startsWith("ddeTestExt_")) {
          let thisSafeType = this.type.replace("ddeTestExt_", "");

          function getShape(block) {
            let { width, height } = block;
            let safeType = block.type.replace("ddeTestExt_", "");
            let outputs = block?.outputConnection?.check_ ?? [];

            if (safeType === "octagon") return octagon(width, height);
            if (safeType === "frame_adapter") return frameAdapter(width, height);
            if (outputs.includes("Boolean")) return buttocks(width, height);
            else return roundPuzzle(width, height);
          }

          if (
            this?.outputConnection?.check_?.length > 0 ||
            thisSafeType === "frame_adapter"
          ) {
            this.svgPath_.setAttribute("d", getShape(this));
          }

          if (thisSafeType === 'frame_adapter') {
            this.inputList.forEach((input) => {
              const block = input?.connection?.targetBlock();
              if (
                block && block?.svgPath_ &&
                path.getAttribute("data_translate_from_frame_adapter") !== true
              ) {
                block.svgPath_.setAttribute("data_translate_from_frame_adapter", true);
                sumToTranslate(block.svgPath_, -3, -44);
              }
            });
          } else {
            this.inputList.forEach((input) => {
              const block = input?.connection?.targetBlock();
              if (block && block?.svgPath_) {
                block.svgPath_.setAttribute("d", getShape(block));
              }
            });
          }
        }

        return data;
      };

      setTimeout(() => {
        SB.Blocks['ddeTestExt_shapeshifting'].onchange = function (event) {
          if (
            !this.workspace ||
            event.type !== 'change' ||
            event?.blockId !== this?.childBlocks_?.at(0)?.id
          ) return;

          if (event.name === "MODE" && event.element === 'field') {
            this.unplug(true);
            if (event.newValue === "STATEMENT") {
              this.setOutput(false);
              this.setPreviousStatement(true);
              this.setNextStatement(true);
            } else if (event.newValue === "OUTPUT") {
              this.setPreviousStatement(false);
              this.setNextStatement(false);
              this.setOutput(true, ["Number"]);
            }
          }
        };
      }, 500);
    });

  class ddeTestExt {
    getInfo() {
      return {
        id: "ddeTestExt",
        name: "ddededodediamante ext",
        color1: "#ee74b5",
        blocks: [
          {
            opcode: "true",
            blockType: Scratch.BlockType.BOOLEAN,
            text: "true",
          },
          {
            opcode: "false",
            blockType: Scratch.BlockType.BOOLEAN,
            text: "false",
          },
          {
            opcode: "poop",
            blockType: Scratch.BlockType.REPORTER,
            text: "poop",
          },
          {
            opcode: "octagon",
            blockType: Scratch.BlockType.REPORTER,
            text: "this is an octagon",
          },
          {
            opcode: "ddededodediamante",
            blockType: Scratch.BlockType.REPORTER,
            text: "ddededodediamante [VAL]",
            arguments: {
              VAL: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "value",
              },
            },
          },
          {
            opcode: "tornadoAlert",
            blockType: Scratch.BlockType.COMMAND,
            text: "send a tornado alert",
          },
          {
            opcode: "ifThenDoNothing",
            blockType: Scratch.BlockType.COMMAND,
            text: "if [BOOLEAN] then do nothing",
            arguments: {
              BOOLEAN: {
                type: Scratch.ArgumentType.BOOLEAN,
              },
            },
          },
          {
            opcode: "shapeshifting",
            blockType: Scratch.BlockType.COMMAND,
            text: "i am [MODE]",
            arguments: {
              MODE: {
                type: Scratch.ArgumentType.STRING,
                menu: 'MODE'
              },
            },
          },
          {
            opcode: "frame_adapter",
            color1: '#b1b1b1',
            blockType: Scratch.BlockType.CONDITIONAL,
            text: "‎",
            branchCount: 1
          },
        ],
        menus: {
          MODE: {
            acceptReporters: true,
            items: [
              {
                text: 'statement',
                value: 'STATEMENT'
              },
              {
                text: 'output',
                value: 'OUTPUT'
              }
            ]
          },
        }
      };
    }

    true() {
      return true;
    }

    false() {
      return false;
    }

    poop() {
      return "💩";
    }

    octagon() {
      return "🛑";
    }

    ddededodediamante(args) {
      return "ddededodediamante " + String(args.VAL);
    }

    tornadoAlert() {
      window.alert("Hi tornado incoming :D");
    }

    ifThenDoNothing(args) {
      if (args.BOOLEAN === true) "do nothing";
    }

    shapeshifting(args) {
      if (args.MODE === 'STATEMENT') {
        window.alert('Statement!');
        return '';
      } else return Math.random();
    }

    diarrhea() {
      return 'diarrhea';
    }

    frame_adapter(_args, util) {
      util.startBranch(1);
    }
  }

  Scratch.extensions.register(new ddeTestExt());
})(Scratch);
