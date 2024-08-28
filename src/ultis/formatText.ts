export const replaceDoubleBackslashN = (text: string): string => {
  return text.replace(/\\n/g, "\n");
};

export function capitalizeFirstLetter(word: string) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}
