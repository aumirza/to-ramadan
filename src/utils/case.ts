// first letter capital
export function capitalize(str: string) {
  const words = str
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.substring(1));
  return words.join(" ");
}
