import type { CSSProperties } from "react";

export type SimpleLottieProps = {
  animationData?: unknown;
  loop?: boolean | number;
  autoplay?: boolean;
  style?: CSSProperties;
  className?: string;
};

export type Day = { date: string; count: number };

export interface FireHeatmapProps {
  data: Day[];
  cellSize?: number;
  gap?: number;
  threshold?: number;
  lottieAnimationData?: unknown;
}
