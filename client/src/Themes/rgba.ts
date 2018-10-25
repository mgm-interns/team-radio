export function rgba({ red, green, blue, alpha }: RGBA) {
  return `rgba(${red || 0}, ${green || 0}, ${blue || 0}, ${alpha || 0})`;
}

export interface RGBA {
  red?: number;
  green?: number;
  blue?: number;
  alpha?: number;
}
