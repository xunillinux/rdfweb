
export function getCacheBusterToken(): string {
  return `?t=${Date.now()}`;
}

export function removeCacheBusterToken(value: string): string {
  return value.replace(/\?t=\d+$/, '').replace(/&t=\d+$/, '');
}
