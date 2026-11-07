import { useState } from "react";
import { ParticleConfig } from "../../lib/Particle";
import styles from "./ConfigPanel.module.scss";

interface ConfigPanelProps {
  config: ParticleConfig;
  onConfigChange: (config: Partial<ParticleConfig>) => void;
  isPlaying: boolean;
  onPlayToggle: () => void;
  onClear: () => void;
  particleCount?: number;
  onSpawnRateChange?: (rate: number) => void;
  onMaxParticlesChange?: (max: number) => void;
  spawnRate?: number;
  maxParticles?: number;
}

export default function ConfigPanel({
  config,
  onConfigChange,
  isPlaying,
  onPlayToggle,
  onClear,
  particleCount = 0,
  onSpawnRateChange,
  onMaxParticlesChange,
  spawnRate = 3,
  maxParticles = 200,
}: ConfigPanelProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const colorPresets = [
    { name: "Blue", value: "#1981ea" },
    { name: "Purple", value: "#8b5cf6" },
    { name: "Green", value: "#22c55e" },
    { name: "Orange", value: "#f97316" },
    { name: "Pink", value: "#ec4899" },
    { name: "Cyan", value: "#06b6d4" },
  ];

  const handleColorChange = (color: string) => {
    onConfigChange({ color });
  };

  const handleSizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onConfigChange({ size: parseInt(e.target.value) });
  };

  const handleSpeedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onConfigChange({ speed: parseFloat(e.target.value) });
  };

  return (
    <div className={styles.container}>
      {/* Main Controls */}
      <div className={styles.mainControls}>
        <button
          onClick={onPlayToggle}
          className={`${styles.playButton} ${isPlaying ? styles.playing : ""}`}
        >
          {isPlaying ? "⏸️" : "▶️"} {isPlaying ? "Pause" : "Play"}
        </button>

        <button onClick={onClear} className={styles.clearButton}>
          🗑️ Clear
        </button>

        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className={styles.expandButton}
        >
          ⚙️ Settings {isExpanded ? "▲" : "▼"}
        </button>
      </div>

      {/* Stats */}
      <div className={styles.stats}>
        <span className={styles.statItem}>Particles: {particleCount}</span>
      </div>

      {/* Advanced Controls */}
      {isExpanded && (
        <div className={styles.advancedControls}>
          {/* Color Selection */}
          <div className={styles.controlGroup}>
            <label className={styles.label}>Color</label>
            <div className={styles.colorGrid}>
              {colorPresets.map((colorPreset) => (
                <button
                  key={colorPreset.name}
                  onClick={() => handleColorChange(colorPreset.value)}
                  className={`${styles.colorButton} ${config.color === colorPreset.value ? styles.active : ""}`}
                  style={{ backgroundColor: colorPreset.value }}
                  title={colorPreset.name}
                />
              ))}
            </div>
          </div>

          {/* Size Control */}
          <div className={styles.controlGroup}>
            <label className={styles.label}>Size: {config.size}px</label>
            <input
              type="range"
              min="4"
              max="20"
              value={config.size}
              onChange={handleSizeChange}
              className={styles.slider}
            />
          </div>

          {/* Speed Control */}
          <div className={styles.controlGroup}>
            <label className={styles.label}>
              Speed: {config.speed.toFixed(1)}
            </label>
            <input
              type="range"
              min="0.1"
              max="5"
              step="0.1"
              value={config.speed}
              onChange={handleSpeedChange}
              className={styles.slider}
            />
          </div>

          {/* Spawn Rate */}
          {onSpawnRateChange && (
            <div className={styles.controlGroup}>
              <label className={styles.label}>Spawn Rate: {spawnRate}</label>
              <input
                type="range"
                min="1"
                max="10"
                value={spawnRate}
                onChange={(e) => onSpawnRateChange(parseInt(e.target.value))}
                className={styles.slider}
              />
            </div>
          )}

          {/* Max Particles */}
          {onMaxParticlesChange && (
            <div className={styles.controlGroup}>
              <label className={styles.label}>
                Max Particles: {maxParticles}
              </label>
              <input
                type="range"
                min="50"
                max="500"
                step="50"
                value={maxParticles}
                onChange={(e) => onMaxParticlesChange(parseInt(e.target.value))}
                className={styles.slider}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
}
