export const textShortener = (text: string, length: number) => {
  if (!text) return;
  return `${text.slice(0, length)}...`;
};
