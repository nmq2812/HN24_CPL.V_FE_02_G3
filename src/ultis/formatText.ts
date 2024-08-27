export const replaceDoubleBackslashN = (text: string): string => {
  return text.replace(/\\n/g, "\n");
};

export function capitalizeFirstLetter(word: string) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

export function handleZero(value: number) {
  return value === 0 ? "" : value;
}

export function suffixS(word: string, quantity: number): string {
  return quantity > 1 ? `${word}s` : word;
}
