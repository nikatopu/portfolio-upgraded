import { useRef, useEffect, useImperativeHandle, forwardRef } from "react";
import { ParticleSystem } from "../../lib/ParticleSystem";
import { ParticleConfig } from "../../lib/Particle";
import styles from "./ParticleCanvas.module.scss";

export interface ParticleCanvasRef {
  setFormula: (formula: string) => void;
  updateConfig: (config: Partial<ParticleConfig>) => void;
  clear: () => void;
  getParticleCount: () => number;
  setSpawnRate: (rate: number) => void;
  setMaxParticles: (max: number) => void;
}

interface ParticleCanvasProps {
  config: ParticleConfig;
  formula: string;
  isPlaying: boolean;
}

const ParticleCanvas = forwardRef<ParticleCanvasRef, ParticleCanvasProps>(
  ({ config, formula, isPlaying }, ref) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const particleSystemRef = useRef<ParticleSystem | null>(null);

    useImperativeHandle(ref, () => ({
      setFormula: (newFormula: string) => {
        particleSystemRef.current?.setFormula(newFormula);
      },
      updateConfig: (newConfig: Partial<ParticleConfig>) => {
        particleSystemRef.current?.updateConfig(newConfig);
      },
      clear: () => {
        particleSystemRef.current?.clear();
      },
      getParticleCount: () => {
        return particleSystemRef.current?.getParticleCount() || 0;
      },
      setSpawnRate: (rate: number) => {
        particleSystemRef.current?.setSpawnRate(rate);
      },
      setMaxParticles: (max: number) => {
        particleSystemRef.current?.setMaxParticles(max);
      },
    }));

    useEffect(() => {
      if (!canvasRef.current) return;

      // Initialize particle system
      particleSystemRef.current = new ParticleSystem(canvasRef.current, config);
      particleSystemRef.current.setFormula(formula);

      return () => {
        particleSystemRef.current?.stop();
      };
    }, []);

    useEffect(() => {
      if (!particleSystemRef.current) return;

      if (isPlaying) {
        particleSystemRef.current.start();
      } else {
        particleSystemRef.current.stop();
      }
    }, [isPlaying]);

    useEffect(() => {
      particleSystemRef.current?.setFormula(formula);
    }, [formula]);

    useEffect(() => {
      particleSystemRef.current?.updateConfig(config);
    }, [config]);

    return (
      <div className={styles.container}>
        <canvas ref={canvasRef} className={styles.canvas} />
      </div>
    );
  },
);

ParticleCanvas.displayName = "ParticleCanvas";

export default ParticleCanvas;
