export type ArtPattern = "mesh" | "grid" | "rings" | "bars" | "arcs" | "cells";

export interface VisualSpec {
  pattern: ArtPattern;
  label: string;
  variant: number;
}

const CELL_LAYOUT: Record<number, number[]> = {
  0: [1, 3, 5, 7],
  1: [2, 4, 6, 8],
  2: [3, 5, 7, 9],
};

export function artCells(variant: number): number[] {
  return CELL_LAYOUT[variant % 3] ?? CELL_LAYOUT[0]!;
}
