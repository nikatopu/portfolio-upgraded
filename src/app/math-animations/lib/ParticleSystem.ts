import { Particle, ParticleConfig } from "./Particle";
import { FormulaEvaluator } from "./FormulaEvaluator";

export class ParticleSystem {
  private particles: Particle[] = [];
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private config: ParticleConfig;
  private formulaEvaluator: FormulaEvaluator;
  private animationId?: number;
  private isRunning: boolean = false;
  private spawnRate: number = 3; // particles per frame
  private maxParticles: number = 200;

  constructor(canvas: HTMLCanvasElement, config: ParticleConfig) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d")!;
    this.config = config;
    this.formulaEvaluator = new FormulaEvaluator();

    // Set up canvas
    this.resizeCanvas();
    window.addEventListener("resize", () => this.resizeCanvas());
  }

  private resizeCanvas() {
    const rect = this.canvas.getBoundingClientRect();
    this.canvas.width = rect.width;
    this.canvas.height = rect.height;
  }

  setFormula(formula: string) {
    this.formulaEvaluator.setFormula(formula);
  }

  updateConfig(newConfig: Partial<ParticleConfig>) {
    this.config = { ...this.config, ...newConfig };
  }

  private spawnParticles() {
    if (this.particles.length < this.maxParticles) {
      for (let i = 0; i < this.spawnRate; i++) {
        if (this.particles.length >= this.maxParticles) break;

        const x = Math.random() * this.canvas.width;
        const y = -10; // Spawn above visible area
        const particle = new Particle(x, y, this.config);
        this.particles.push(particle);
      }
    }
  }

  private updateParticles() {
    for (let i = this.particles.length - 1; i >= 0; i--) {
      const particle = this.particles[i];

      particle.update(
        this.formulaEvaluator.evaluate.bind(this.formulaEvaluator),
      );

      // Remove dead or off-screen particles
      if (
        particle.isDead() ||
        particle.x < -50 ||
        particle.x > this.canvas.width + 50 ||
        particle.y > this.canvas.height + 50
      ) {
        this.particles.splice(i, 1);
      }
    }
  }

  private draw() {
    // Clear canvas with subtle fade effect
    this.ctx.fillStyle = "rgba(18, 18, 18, 0.1)";
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    // Draw particles
    this.particles.forEach((particle) => {
      particle.draw(this.ctx);
    });
  }

  private animate() {
    if (!this.isRunning) return;

    this.spawnParticles();
    this.updateParticles();
    this.draw();

    this.animationId = requestAnimationFrame(() => this.animate());
  }

  start() {
    if (this.isRunning) return;
    this.isRunning = true;
    this.animate();
  }

  stop() {
    this.isRunning = false;
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }
  }

  clear() {
    this.particles = [];
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.fillStyle = "#121212";
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
  }

  getParticleCount(): number {
    return this.particles.length;
  }

  setSpawnRate(rate: number) {
    this.spawnRate = Math.max(0, Math.min(10, rate));
  }

  setMaxParticles(max: number) {
    this.maxParticles = Math.max(10, Math.min(500, max));
  }
}
