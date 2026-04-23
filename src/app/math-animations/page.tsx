"use client";

import { useState, useRef, useEffect } from "react";
import SimpleHeader from "../components/molecules/SimpleHeader";
import ParticleCanvas, { ParticleCanvasRef } from "./components/ParticleCanvas";
import FormulaInput from "./components/FormulaInput";
import PresetSelector from "./components/PresetSelector";
import ConfigPanel from "./components/ConfigPanel";
import { ParticleConfig } from "./lib/Particle";
import styles from "./MathAnimations.module.scss";

export default function MathAnimations() {
  const canvasRef = useRef<ParticleCanvasRef>(null);
  const [currentFormula, setCurrentFormula] = useState("2 * sin(y) + sin(y/2)");
  const [isPlaying, setIsPlaying] = useState(true);
  const [particleCount, setParticleCount] = useState(0);
  const [spawnRate, setSpawnRate] = useState(3);
  const [maxParticles, setMaxParticles] = useState(200);

  const [config, setConfig] = useState<ParticleConfig>({
    color: "#1981ea",
    size: 8,
    speed: 2,
  });

  // Update particle count periodically
  useEffect(() => {
    if (!canvasRef.current) return;

    const updateCount = () => {
      setParticleCount(canvasRef.current?.getParticleCount() || 0);
    };

    const interval = setInterval(updateCount, 100);
    return () => clearInterval(interval);
  }, []);

  const handleFormulaChange = (formula: string) => {
    setCurrentFormula(formula);
    canvasRef.current?.setFormula(formula);
  };

  const handlePresetSelect = (formula: string) => {
    handleFormulaChange(formula);
  };

  const handleConfigChange = (newConfig: Partial<ParticleConfig>) => {
    const updatedConfig = { ...config, ...newConfig };
    setConfig(updatedConfig);
    canvasRef.current?.updateConfig(newConfig);
  };

  const handlePlayToggle = () => {
    setIsPlaying(!isPlaying);
  };

  const handleClear = () => {
    canvasRef.current?.clear();
    setParticleCount(0);
  };

  const handleSpawnRateChange = (rate: number) => {
    setSpawnRate(rate);
    canvasRef.current?.setSpawnRate(rate);
  };

  const handleMaxParticlesChange = (max: number) => {
    setMaxParticles(max);
    canvasRef.current?.setMaxParticles(max);
  };

  return (
    <>
      <SimpleHeader />
      <div className={styles.container}>
        {/* Header */}
        <header className={styles.header}>
          <h1 className={styles.title}>Mathematical Particle Animations</h1>
          <p className={styles.description}>
            Explore how simple mathematical formulas create complex, beautiful
            particle movements. Input your own formulas using sine, cosine, and
            tangent functions, or try our presets.
          </p>
        </header>

        {/* Main Content */}
        <div className={styles.content}>
          {/* Left Panel - Controls */}
          <div className={styles.controlPanel}>
            <FormulaInput
              value={currentFormula}
              onChange={handleFormulaChange}
            />

            <PresetSelector
              onPresetSelect={handlePresetSelect}
              currentFormula={currentFormula}
            />

            <ConfigPanel
              config={config}
              onConfigChange={handleConfigChange}
              isPlaying={isPlaying}
              onPlayToggle={handlePlayToggle}
              onClear={handleClear}
              particleCount={particleCount}
              onSpawnRateChange={handleSpawnRateChange}
              onMaxParticlesChange={handleMaxParticlesChange}
              spawnRate={spawnRate}
              maxParticles={maxParticles}
            />
          </div>

          {/* Right Panel - Canvas */}
          <div className={styles.canvasPanel}>
            <div className={styles.canvasContainer}>
              <ParticleCanvas
                ref={canvasRef}
                config={config}
                formula={currentFormula}
                isPlaying={isPlaying}
              />
            </div>

            {/* Formula Display */}
            <div className={styles.formulaDisplay}>
              <span className={styles.formulaLabel}>Current Formula:</span>
              <code className={styles.formulaCode}>{currentFormula}</code>
            </div>
          </div>
        </div>

        {/* Info Section */}
        <section className={styles.infoSection}>
          <h2 className={styles.infoTitle}>How It Works</h2>
          <div className={styles.infoGrid}>
            <div className={styles.infoCard}>
              <h3>Simple Mathematics</h3>
              <p>
                Each particle's movement is governed by mathematical functions.
                Sine and cosine create wave patterns, while combining functions
                produces complex behaviors.
              </p>
            </div>
            <div className={styles.infoCard}>
              <h3>Interactive Formulas</h3>
              <p>
                Use variables x, y (position) and t (time) in your formulas. Try
                functions like sin(x), cos(y), tan(t), or combine them
                creatively.
              </p>
            </div>
            <div className={styles.infoCard}>
              <h3>Real-time Animation</h3>
              <p>
                Watch as particles respond instantly to formula changes. The
                HTML5 Canvas renders smooth animations using object-oriented
                principles.
              </p>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
