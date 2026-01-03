export function pad(n: number) {
  return n < 10 ? `0${n}` : `${n}`;
}

export function isoDate(d: Date) {
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

export function startOfWeek(d: Date) {
  const copy = new Date(d);
  const day = copy.getDay();
  copy.setDate(copy.getDate() - day);
  copy.setHours(0, 0, 0, 0);
  return copy;
}

export function daysBetween(a: Date, b: Date) {
  return Math.round((b.getTime() - a.getTime()) / (1000 * 60 * 60 * 24));
}

// const threshold = 4;

export function colorFor(count: number): string {
  if (!count || count <= 0) return "bg-[#1e1e1e]"; // Empty: slightly lighter than black for visibility
  if (count == 1) return "bg-[#1e40af]"; // Blue 800 (Brighter than before)
  if (count == 2) return "bg-[#3b82f6]"; // Blue 500
  if (count == 3) return "bg-[#60a5fa]"; // Blue 400
  return "bg-[#000000] relative overflow-hidden will-change-transform fire-cell"; // Black behind fire
}
