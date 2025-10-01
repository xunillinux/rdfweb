export function replaceEscapedNewlines(text: string) {
  return text.replace(/\\n/g, '\n');
}

export function replaceNewlinesWithSpace(text: string) {
  return text.replace(/\\n/g, ' ');
}

export function sanitizeString(str: unknown, maxLen: number): string {
  if (typeof str !== 'string') throw new Error('Invalid type');
  const trimmed = str.trim().slice(0, maxLen); // truncate to safe length
  return trimmed;
}