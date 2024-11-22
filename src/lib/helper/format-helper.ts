export function replaceEscapedNewlines(text: string) {
  return text.replace(/\\n/g, '\n');
}

export function replaceNewlinesWithSpace(text: string) {
  return text.replace(/\\n/g, ' ');
}