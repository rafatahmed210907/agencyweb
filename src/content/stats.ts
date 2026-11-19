export interface Stat {
  value: number;
  suffix: string;
  label: string;
  decimals?: number;
}

export const stats: Stat[] = [
  { value: 38, suffix: "+", label: "Projects delivered" },
  { value: 6, suffix: "", label: "Senior specialists" },
  { value: 4.9, suffix: "/5", label: "Average client rating", decimals: 1 },
  { value: 12, suffix: " wk", label: "Median plan-to-launch" },
];
