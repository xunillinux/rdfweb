
export function normalizedToday() {
  const today = new Date();
  today.setHours(0,0,0,0);
  return today;
}

export function normalizeDate(date: Date) {
  const normalizedDate = new Date(date);
  normalizedDate.setHours(0,0,0,0)
  return normalizedDate;
}