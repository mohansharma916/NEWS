"use client";

import { LazyMotion, domAnimation, m } from "motion/react";

export const MotionP = m.p;
export const MotionDiv = m.div;
export const MotionMain = m.main;
export const MotionSection = m.section;
export const MotionPath = m.path;
export const MotionSVG = m.svg;
export const MotionButton = m.button;
export const MotionSpan = m.span;
export const MotionUL = m.ul;
export const MotionLI = m.li;

export default function MotionOptimize({ children }: React.PropsWithChildren) {
  return (
    <LazyMotion strict features={domAnimation}>
      {children}
    </LazyMotion>
  );
}
