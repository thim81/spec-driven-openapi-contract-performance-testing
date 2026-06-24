import type { Hero } from "./data";

// Deterministic per-hero accent so cards feel curated, not random.
const HUE_BY_ID: Record<number, [number, number]> = {
  1: [25, 30],   // Iron Man - red/gold
  2: [10, 240],  // Spider-Man - red/blue
  3: [240, 0],   // Cap - blue/red
  4: [70, 240],  // Thor - gold/blue
  5: [140, 90],  // Hulk - green
  6: [10, 0],    // Widow - crimson
  7: [285, 0],   // Panther - violet/black
  8: [25, 320],  // Strange - amber/magenta
  9: [10, 300],  // Wanda - red/violet
  10: [55, 200], // Carol - gold/blue
  11: [25, 280], // Star-Lord - amber/violet
  12: [40, 200], // Rocket - orange/teal
};

export function heroGradient(hero: Hero): string {
  const [a, b] = HUE_BY_ID[hero.id] ?? [38, 20];
  return `linear-gradient(135deg, oklch(0.55 0.18 ${a}) 0%, oklch(0.28 0.08 ${b}) 100%)`;
}

export function heroInitials(hero: Hero): string {
  const parts = hero.name.split(/\s+/).filter(Boolean);
  if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase();
  return hero.name.slice(0, 2).toUpperCase();
}

export function heroMonogram(hero: Hero): string {
  // Single bold glyph for the spotlight — first letter of last name when present
  return (hero.last_name?.[0] ?? hero.name[0]).toUpperCase();
}
