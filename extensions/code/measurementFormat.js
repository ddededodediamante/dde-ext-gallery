(function (Scratch) {
  if (!Scratch.extensions.unsandboxed) {
    window.alert('The extension "Measurement Format" must be run unsandboxed!');
    throw new Error(
      'The extension "Measurement Format" must be run unsandboxed!'
    );
  }

  const categories = {
    length: {
      mm: 0.001,
      cm: 0.01,
      m: 1,
      km: 1000,
      in: 0.0254,
      ft: 0.3048,
      yd: 0.9144,
      mi: 1609.34,
    },
    weight: {
      g: 0.001,
      kg: 1,
      lb: 0.453592,
      oz: 0.0283495,
    },
  };

  const units = Object.fromEntries(
    Object.entries(categories).flatMap(([type, unitMap]) =>
      Object.keys(unitMap).map((unit) => [
        unit,
        { type, factor: unitMap[unit] },
      ])
    )
  );

  const sortedUnits = Object.entries(units)
    .sort(([, a], [, b]) => b.factor - a.factor)
    .map(([unit]) => unit);

  class MeasurementFormatExtension {
    getInfo() {
      return {
        id: "ddeMeasurementFormat",
        name: "Measurement Format",
        color1: "#fc9003",
        blocks: [
          {
            opcode: "convert",
            blockType: Scratch.BlockType.REPORTER,
            text: "convert [VALUE] [FROM] to [TO]",
            arguments: {
              VALUE: { type: Scratch.ArgumentType.NUMBER, defaultValue: 100 },
              FROM: {
                type: Scratch.ArgumentType.STRING,
                menu: "units",
                defaultValue: "cm",
              },
              TO: {
                type: Scratch.ArgumentType.STRING,
                menu: "units",
                defaultValue: "m",
              },
            },
          },
          {
            opcode: "formatReadable",
            blockType: Scratch.BlockType.REPORTER,
            text: "format [VALUE] [UNIT] as readable text",
            arguments: {
              VALUE: { type: Scratch.ArgumentType.NUMBER, defaultValue: 1.5 },
              UNIT: {
                type: Scratch.ArgumentType.STRING,
                menu: "units",
                defaultValue: "m",
              },
            },
          },
          {
            opcode: "autoConvert",
            blockType: Scratch.BlockType.REPORTER,
            text: "auto convert [VALUE] [FROM] to best unit",
            arguments: {
              VALUE: { type: Scratch.ArgumentType.NUMBER, defaultValue: 1500 },
              FROM: {
                type: Scratch.ArgumentType.STRING,
                menu: "units",
                defaultValue: "m",
              },
            },
          },
          {
            opcode: "unitFactor",
            blockType: Scratch.BlockType.REPORTER,
            text: "factor of unit [UNIT]",
            arguments: {
              UNIT: {
                type: Scratch.ArgumentType.STRING,
                menu: "units",
                defaultValue: "m",
              },
            },
          },
          {
            opcode: "listUnits",
            blockType: Scratch.BlockType.REPORTER,
            text: "list all units",
          },
        ],
        menus: {
          units: { items: Object.keys(units), acceptReporters: true },
        },
      };
    }

    convert({ VALUE, FROM, TO }) {
      VALUE = Scratch.Cast.toNumber(VALUE);

      const from = units[FROM];
      const to = units[TO];
      if (!from || !to) return null;

      if (from.type !== to.type) {
        throw new Error('Incompatible units');
      }

      const result = VALUE * (from.factor / to.factor);
      return Number.isFinite(result) ? result : null;
    }

    formatReadable({ VALUE, UNIT }) {
      VALUE = Scratch.Cast.toNumber(VALUE);
      if (!units[UNIT]) return null;
      return `${VALUE} ${UNIT}`;
    }

    autoConvert({ VALUE, FROM }) {
      VALUE = Scratch.Cast.toNumber(VALUE);
      const from = units[FROM];
      if (!from) return null;

      const base = VALUE * from.factor;
      const category = from.type;

      for (const unit of sortedUnits) {
        if (units[unit].type !== category) continue;

        const factor = units[unit].factor;
        if (base >= factor) {
          const converted = base / factor;
          return `${converted} ${unit}`;
        }
      }

      return `${VALUE} ${FROM}`;
    }

    unitFactor({ UNIT }) {
      const unit = units[UNIT];
      return unit ? unit.factor : null;
    }

    listUnits() {
      return Object.keys(units).join(", ");
    }
  }

  Scratch.extensions.register(new MeasurementFormatExtension());
})(Scratch);
