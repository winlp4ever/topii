import colors from 'tailwindcss/colors';

// Filter only base colors that have shades
type BaseTailwindColor = {
  [K in keyof typeof colors]: typeof colors[K] extends Record<string, string> ? K : never;
}[keyof typeof colors];

export function getRandomTailwindBaseColor(shade: keyof typeof colors.blue = '500'): string {
  const baseColors = Object.keys(colors).filter((key) => {
    const group = colors[key as keyof typeof colors];
    return typeof group === 'object' && group !== null && shade in group;
  }) as BaseTailwindColor[];

  const randomBase = baseColors[Math.floor(Math.random() * baseColors.length)];
  const hex = colors[randomBase]?.[shade] as string;

  return hex;
}
