(async function (Scratch) {
  class MinecraftType {
    constructor() {
      this.customId = "ddeTextExtEvil.minecraft";
    }

    toString() {
      return "Minecraft";
    }

    toReporterContent() {
      const container = document.createElement("iframe");
      container.src = "https://classic.minecraft.net/";
      container.width = 300;
      container.style.width = 300;
      return container;
    }

    toMonitorContent() {
      const container = document.createElement("p");
      container.innerText = "yeah it doesn't work here";
      return container;
    }

    toListItem() {
      return this.toMonitorContent();
    }

    toListEditor() {
      return this.toString();
    }

    fromListEditor(edit) {
      return new MinecraftType(edit);
    }
  }

  let setupShapeshifting = () => {};
  if (Scratch.gui) {
    Scratch.gui.getBlockly().then(SB => {
      console.log(SB)
      setupShapeshifting = () => {
        SB.Blocks["ddeTestExtEvil_shapeshifting"] = {
          init: function () {
            this.appendDummyInput()
              .appendField("i am")
              .appendField(
                new SB.FieldDropdown([
                  ["a statement", "STATEMENT"],
                  ["an output", "OUTPUT"],
                ]),
                "MODE"
              );
            this.setColour("#4290f5");
            this.setTooltip("tooltip");
            
            this.mode_ = this.getFieldValue("MODE") || "STATEMENT";
            this.updateShape();
          },

          updateShape: function () {
            if (this.mode_ === "OUTPUT") {
              this.setOutput(true, "Number");
              this.setPreviousStatement(false);
              this.setNextStatement(false);
            } else if (this.mode_ === "STATEMENT") {
              this.setOutput(false);
              this.setPreviousStatement(true);
              this.setNextStatement(true);
            }

            if (this.render) this.render();
          },

          mutationToDom: function () {
            const container = document.createElement("mutation");
            container.setAttribute("mode", this.mode_);
            return container;
          },

          domToMutation: function (xml) {
            const m = xml.getAttribute("mode");
            this.mode_ = m;
            this.updateShape();
          },

          saveExtraState: function () {
            return {
              mode: this.mode_,
            };
          },

          loadExtraState: function (state) {
            console.log(state)
            const m =
              (state && state.mode) ||
              this.getFieldValue("MODE") ||
              "STATEMENT";
            this.mode_ = m;
            this.updateShape();
          },

          onchange: function (e) {
            if (
              e.type === "change" &&
              e.name === "MODE" &&
              e.element === "field" &&
              e.blockId === this.id
            ) {
              this.mode_ = e.newValue;
              this.unplug(true);
              this.updateShape();
            }
          },
        };
      };
    });
  }

  class ddeTestExtEvil {
    constructor() {
      this.runtime = Scratch.vm.runtime;
      this.runtime.registerCompiledExtensionBlocks(
        "ddeTestExtEvil",
        this.getCompileInfo()
      );
    }

    getInfo() {
      setupShapeshifting();

      return {
        id: "ddeTestExtEvil",
        name: "dde Test Extension (EVIL)",
        color1: "#4290f5",
        blocks: [
          {
            opcode: "compiledIfNot",
            text: "if not [CONDITION] then (compiled)",
            branchCount: 1,
            blockType: Scratch.BlockType.CONDITIONAL,
            arguments: {
              CONDITION: { type: Scratch.ArgumentType.BOOLEAN },
            },
          },
          {
            blockType: Scratch.BlockType.XML,
            xml: `<block type="ddeTestExtEvil_shapeshifting"><mutation mode="STATEMENT"></mutation></block>`,
          },
          //(() => {
          //  setupShapeshifting();
          //  return {
          //    opcode: "shapeshifting",
          //    blockType: Scratch.BlockType.REPORTER,
          //    text: "i am [MODE]",
          //    arguments: {
          //      MODE: {
          //        type: Scratch.ArgumentType.STRING,
          //        menu: "MODE",
          //      },
          //    },
          //  };
          //})(),
          {
            opcode: "minecraft",
            blockType: Scratch.BlockType.REPORTER,
            blockShape: Scratch.BlockShape.TICKET,
            text: "minecraft",
          },
        ],
        menus: {
          MODE: ["STATEMENT", "OUTPUT"],
        },
      };
    }

    getCompileInfo() {
      setupShapeshifting();

      return {
        ir: {
          compiledIfNot: (generator, block) => ({
            kind: "stack",
            condition: generator.descendInputOfBlock(block, "CONDITION"),
            whenTrue: generator.descendSubstack(block, "SUBSTACK"),
            whenFalse: [],
          }),
          shapeshifting: (generator, block) => {
            console.log(generator, block);
            const value = block.fields.MODE.value;
            return {
              kind: value === "OUTPUT" ? "expression" : "stack",
              args: {
                MODE: { kind: "constant", value: value },
              },
            };
          },
        },
        js: {
          compiledIfNot: (node, compiler, imports) => {
            compiler.source += `if (!(${compiler
              .descendInput(node.condition)
              .asBoolean()})) {\n`;
            compiler.descendStack(node.whenTrue, new imports.Frame(false));
            if (node.whenFalse.length) {
              compiler.source += `} else {\n`;
              compiler.descendStack(node.whenFalse, new imports.Frame(false));
            }
            compiler.source += `}\n`;
          },
          shapeshifting: (node, compiler) => {
            const rawMode = node.args.MODE.value;

            if (rawMode === "OUTPUT") {
              compiler.source += `return (() => Math.random())()`;
              return `return (() => Math.random())();`;
            } else {
              compiler.source += `console.log("I am a shapeshifting statement.");\n`;
            }
          },
        },
      };
    }

    compiledIfNot(args, util) {
      const condition = Scratch.Cast.toBoolean(args.CONDITION);
      if (!condition) {
        util.startBranch(1, false);
      }
    }
    shapeshifting(args, util) {
      if (args.MODE === "OUTPUT") {
        return Math.random();
      } else {
        console.log("I am a shapeshifting statement (runtime).");
      }
    }
    minecraft() {
      return new MinecraftType();
    }
  }

  Scratch.extensions.register(new ddeTestExtEvil());
})(Scratch);
