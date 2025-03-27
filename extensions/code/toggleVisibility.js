(async function (Scratch) {
  "use strict";

  if (!Scratch.extensions.unsandboxed) throw new Error("This extension must run unsandboxed!");

  if (Scratch?.extensions?.isPenguinMod === true) {
    if (
      !window.confirm(
        "⚠ WARNING: This extension is not fully compatible with your platform. Collapsed blocks may appear visually buggy, but they will still function correctly. Do you want to continue?"
      )
    )
      return;
  }

  // Made by ddededodediamante

  if (Scratch.gui)
    Scratch.gui.getBlockly().then((SB) => {
      SB.BlockSvg.prototype.showContextMenu_ = function (e) {
        SB.ContextMenu.toggleVisibility = function (e) {
          var isCollapsed = e.isCollapsed();
          return {
            text: isCollapsed ? "Expand Block" : "Collapse Block",
            enabled: true,
            callback: function () {
              e.setCollapsed(!isCollapsed);
            },
          };
        };

        if (!this.workspace.options.readOnly && this.contextMenu) {
          let options = [];

          if (this.isDeletable() && this.isMovable() && !this.isInFlyout) {
            options.push(SB.ContextMenu.blockDuplicateOption(this, e));

            if (this.isEditable() && this.workspace.options.comments) {
              options.push(SB.ContextMenu.blockCommentOption(this));
            }

            options.push(SB.ContextMenu.blockDeleteOption(this));
            options.push(SB.ContextMenu.toggleVisibility(this));
          } else if (this.parentBlock_ && this.isShadow_) {
            this.parentBlock_.showContextMenu_(e);
            return;
          }

          if (this.customContextMenu) {
            this.customContextMenu(options);
          }

          SB.ContextMenu.show(e, options, this.RTL);
          SB.ContextMenu.currentBlock = this;
        }
      };
    });

  class ddeAddonExt {
    getInfo() {
      return {
        id: "ddeToggleVisibility",
        name: "Toggle Visibility",
        blocks: [],
      };
    }
  }

  Scratch.extensions.register(new ddeAddonExt());
})(Scratch);
