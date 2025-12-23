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

const threshold = 10;

export function colorFor(count: number): string {
  if (!count || count <= 0) return "bg-[#242424]";
  if (count == 1) return "bg-[#3A3A3A]";
  if (count == 2) return "bg-[#5E5E5E]";
  if (count > 2 && count <= threshold) return "bg-[#A0A0A0]";
  return "bg-[#ff0000] relative overflow-hidden will-change-transform fire-cell";
}
