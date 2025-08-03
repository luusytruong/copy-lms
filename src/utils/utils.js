export function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

export function parseStudentName(str) {
  if (!str) return null;
  const arr = str.split(" - ");
  const [id, name, major, course] = arr.map((item) => item.trim());
  return { id, name, major, course };
}
