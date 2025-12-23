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
  threshold?: number;
  cellSize?: number;
  gap?: number;
  lottieAnimationData?: SimpleLottieProps | null;
}
