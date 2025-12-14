export function random(min: number, max: number): number {
  return Math.round((Math.random() * (max - min) + min) * 10) / 10;
}