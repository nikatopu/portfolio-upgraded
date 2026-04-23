"use client";

import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
} from "react";
import { NaturalDimensions } from "../hooks/useImageInteraction";

export interface Coordinates {
  x: number;
  y: number;
}

export interface LineCoordinates {
  id: number;
  start: Coordinates;
  end: Coordinates;
  color: string;
}

export type TActiveTool = "point" | "line" | "pan";
export type TModal = "submit" | "howToPlay" | null;

interface GameContextType {
  attempts: Coordinates[];
  setAttempts: React.Dispatch<React.SetStateAction<Coordinates[]>>;
  activeTool: TActiveTool;
  setActiveTool: React.Dispatch<React.SetStateAction<TActiveTool>>;
  modal: TModal;
  setModal: React.Dispatch<React.SetStateAction<TModal>>;
  maxAttempts: number;
  lines: LineCoordinates[];
  setLines: React.Dispatch<React.SetStateAction<LineCoordinates[]>>;
  naturalDimensions: NaturalDimensions | null;
  setNaturalDimensions: React.Dispatch<React.SetStateAction<NaturalDimensions | null>>;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider = ({ children }: { children: ReactNode }) => {
  const [attempts, setAttempts] = useState<Coordinates[]>([]);
  const [activeTool, setActiveTool] = useState<TActiveTool>("point");
  const [modal, setModal] = useState<TModal>(null);
  const [lines, setLines] = useState<LineCoordinates[]>([]);
  const [naturalDimensions, setNaturalDimensions] = useState<NaturalDimensions | null>(null);
  const maxAttempts = 3; // Fixed number for showcase

  return (
    <GameContext.Provider
      value={{
        attempts,
        setAttempts,
        activeTool,
        setActiveTool,
        modal,
        setModal,
        maxAttempts,
        lines,
        setLines,
        naturalDimensions,
        setNaturalDimensions,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export const useGameContext = () => {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error("useGameContext must be used within a GameProvider");
  }
  return context;
};