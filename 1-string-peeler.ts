/**
 * https://dev.to/thepracticaldev/daily-challenge-1-string-peeler-4nep
 */
export const removeFirstAndLastLetter = (str: string) => {
  return str.length <= 2 ? undefined : str.slice(1, -1);
};

console.log(removeFirstAndLastLetter("Hello for test"));
console.log(removeFirstAndLastLetter("hi"));
