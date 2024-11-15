export function replaceEscapedNewlines(text: string) {
  return text.replace(/\\n/g, '\n');
}