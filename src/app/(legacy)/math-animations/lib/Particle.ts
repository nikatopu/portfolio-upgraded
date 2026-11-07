export interface ParticleConfig {
  color: string;
  size: number;
  speed: number;
}

export class Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  age: number;
  maxAge: number;
  initialX: number;
  initialY: number;
  time: number;
  config: ParticleConfig;
  image?: HTMLImageElement;

  constructor(x: number, y: number, config: ParticleConfig) {
    this.x = x;
    this.y = y;
    this.initialX = x;
    this.initialY = y;
    this.vx = (Math.random() - 0.5) * config.speed;
    this.vy = (Math.random() - 0.5) * config.speed;
    this.size = config.size + Math.random() * config.size * 0.5;
    this.color = config.color;
    this.age = 0;
    this.maxAge = 300 + Math.random() * 200; // 300-500 frames
    this.time = 0;
    this.config = config;
  }

  private loadImage(url: string) {
    this.image = new Image();
    this.image.src = url;
  }

  update(
    formulaFunction: (
      x: number,
      y: number,
      time: number,
    ) => { x: number; y: number },
  ) {
    this.age++;
    this.time += 0.05;

    // Apply mathematical formula to position
    try {
      const newPos = formulaFunction(this.x, this.y, this.time);
      this.x = newPos.x;
      this.y = newPos.y;
    } catch (error) {
      // If formula fails, use simple physics
      this.x += this.vx;
      this.y += this.vy;
    }

    // Simple gravity effect
    this.vy += 0.01;
  }

  draw(ctx: CanvasRenderingContext2D) {
    const opacity = Math.max(0, 1 - this.age / this.maxAge);

    ctx.save();
    ctx.globalAlpha = opacity;

    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size / 2, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();
  }

  isDead(): boolean {
    return this.age >= this.maxAge;
  }
}
