export class FormulaEvaluator {
  private formula: string = "x";
  private compiledFormula?: Function;

  constructor(initialFormula: string = "x") {
    this.setFormula(initialFormula);
  }

  setFormula(formula: string) {
    this.formula = formula.toLowerCase().trim();
    try {
      this.compiledFormula = this.compileFormula(this.formula);
    } catch (error) {
      console.warn("Invalid formula, falling back to default:", error);
      this.compiledFormula = this.compileFormula("x");
    }
  }

  private compileFormula(formula: string): Function {
    // Sanitize the formula - only allow safe mathematical operations
    const sanitized = formula
      .replace(/[^x y t sin cos tan log sqrt pi e +\-*/()0-9.\s]/g, "")
      .replace(/\bsin\b/g, "Math.sin")
      .replace(/\bcos\b/g, "Math.cos")
      .replace(/\btan\b/g, "Math.tan")
      .replace(/\blog\b/g, "Math.log")
      .replace(/\bsqrt\b/g, "Math.sqrt")
      .replace(/\bpi\b/g, "Math.PI")
      .replace(/\be\b/g, "Math.E")
      .replace(/\bt\b/g, "time");

    // Create safe evaluation function
    return new Function(
      "x",
      "y",
      "time",
      `
      try {
        const result = ${sanitized};
        return isNaN(result) || !isFinite(result) ? 0 : result;
      } catch {
        return 0;
      }
    `,
    );
  }

  evaluate(x: number, y: number, time: number): { x: number; y: number } {
    if (!this.compiledFormula) {
      return { x, y };
    }

    try {
      // Normalize coordinates for formula evaluation
      const normalizedX = x / 100;
      const normalizedY = y / 100;

      // Evaluate formula
      const result = this.compiledFormula(normalizedX, normalizedY, time);

      // Apply the mathematical transformation
      let newX = x;
      let newY = y;

      if (typeof result === "number") {
        // Simple displacement based on formula result
        newX += Math.sin(result * 0.1) * 2;
        newY += Math.cos(result * 0.1) * 2;
      }

      // Additional formula-based movement patterns
      if (this.formula.includes("sin")) {
        newX += Math.sin(time + y * 0.01) * 3;
      }
      if (this.formula.includes("cos")) {
        newY += Math.cos(time + x * 0.01) * 2;
      }
      if (this.formula.includes("tan")) {
        newX += Math.tan(time * 0.5) * 0.5;
      }

      return {
        x: isFinite(newX) ? newX : x,
        y: isFinite(newY) ? newY : y,
      };
    } catch (error) {
      return { x, y };
    }
  }

  getFormula(): string {
    return this.formula;
  }

  static getPresets() {
    return [
      { name: "Wave Motion", formula: "2 * sin(y) + sin(y/2)" },
      { name: "Circular Flow", formula: "sin(x) + cos(y)" },
      {
        name: "Spiral Dance",
        formula: "sin(t) * cos(x/50) + cos(t) * sin(y/50)",
      },
      { name: "Figure Eight", formula: "sin(2*t) * cos(t)" },
      { name: "Pulsing Grid", formula: "sin(x/30) * cos(y/30) + t" },
      { name: "Tornado", formula: "tan(t/2) * sin(x/40) + cos(y/40)" },
      { name: "Simple Fall", formula: "x" },
    ];
  }
}
