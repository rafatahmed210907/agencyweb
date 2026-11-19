export interface Stat {
  value: number;
  suffix: string;
  label: string;
  decimals?: number;
}

export const stats: Stat[] = [
  { value: 38, suffix: "+", label: "Products shipped" },
  { value: 6, suffix: "", label: "Senior specialists" },
  { value: 4.9, suffix: "/5", label: "Average client rating", decimals: 1 },
  { value: 98, suffix: "%", label: "Projects delivered on scope" },
];
