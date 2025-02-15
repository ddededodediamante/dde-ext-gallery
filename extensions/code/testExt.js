(function (Scratch) {
  "use strict";
  if (!Scratch.extensions.unsandboxed)
    throw new Error("This extension must run unsandboxed!");

  // Thanks sharkpool for original patch!
  if (Scratch.gui)
    Scratch.gui.getBlockly().then((SB) => {
      const makeButtocksShape = (width, height) => {
        width -= 18;
        height /= 2;
        return `M 9 0 a 1 1 0 0 0 0 ${height} a 1 1 0 0 0 0 ${height} h ${width} a 1 1 0 0 0 0 -${height} a 1 1 0 0 0 0 -${height} h -${width} z`;
      };

      const makeHexagonShape = (width, height) => {
        width -= 18;
        return `M 9 0 l -10 10 v ${height - 20} l 10 10 h ${width} l 10 -10 v -${
          height - 20
        } l -10 -10 h -${width} z`;
      };

      const makeRoundyPuzzleShape = (width, height) => {
        height -= 20;
        height /= 2;
        width -= 20;
        return `M 20 0 q -10 0 -10 ${height} q -10 0 -10 10 q 0 10 10 10 q 0 ${height} 10 ${height} H ${width} q 10 0 10 -${height} q 10 0 10 -10 q 0 -10 -10 -10 q 0 -${height} -10 -${height} H 20 Z`;
      };

      const makeWeirdCommandShape = (width, height) => {
        width /= 2;
        return `M 0 0 V ${
          height - 10
        } l ${width} 10 l ${width} -10 V 0 l -${width} 10 l -${width} -10 Z`;
      };

      const ogRender = SB.BlockSvg.prototype.render;
      console.log(SB.BlockSvg.prototype);
      SB.BlockSvg.prototype.render = function (...args) {
        const data = ogRender.call(this, ...args);

        if (this.svgPath_ && this.type.startsWith("ddeTestExt_")) {
          function getShape(block) {
            if (block.type === "ddeTestExt_hexagon")
              return makeHexagonShape(block.width, block.height);
            const outputs = block?.outputConnection?.check_ ?? [];
            if (outputs.includes("Boolean"))
              return makeButtocksShape(block.width, block.height);
            else return makeRoundyPuzzleShape(block.width, block.height);
          }

          if (this?.outputConnection?.check_?.length > 0) {
            this.svgPath_.setAttribute("d", getShape(this));
          } else {
            this.svgPath_.setAttribute(
              "d",
              makeWeirdCommandShape(this.width, this.height)
            );
          }

          this.inputList.forEach((input) => {
            const block = input?.connection?.targetBlock();
            if (block && block.svgPath_) {
              block.svgPath_.setAttribute("d", getShape(block));
            }
          });
        }

        return data;
      };
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
            opcode: "hexagon",
            blockType: Scratch.BlockType.REPORTER,
            text: "this is a hexagon",
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
        ],
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

    hexagon() {
      return "🛑";
    }

    ddededodediamante(args) {
      return "ddededodediamante " + String(args.VAL);
    }

    tornadoAlert() {
      window.alert("Hi tornado incoming :D");
    }

    ifThenDoNothing(args) {
      if (args.BOOLEAN) "do nothing";
    }
  }

  Scratch.extensions.register(new ddeTestExt());
})(Scratch);
