import dynamic from "next/dynamic";
import type { ComponentType } from "react";
import { SimpleLottieProps } from "./types";

export const Lottie = dynamic(
  () => import("lottie-react").then((mod) => mod.default),
  { ssr: false }
) as unknown as ComponentType<SimpleLottieProps>;

