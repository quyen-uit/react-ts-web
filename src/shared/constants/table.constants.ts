export const COLUMN_SIZES: Record<string, { minSize: number; size: number }> = {
  date: { minSize: 192, size: 360 },
  time: { minSize: 150, size: 280 },
  datetime: { minSize: 240, size: 440 },
  boolean: { minSize: 100, size: 150 },
  text: { minSize: 100, size: 200 }, // default
};
