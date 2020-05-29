/**
 * https://dev.to/thepracticaldev/daily-challenge-3-vowel-counter-34ni
 */

const { args } = Deno;

let str = args[0];

if (!str) {
  console.log(
    "You can provide a string to while running, Since you didn't we are gonna use the link :)"
  );
  str = "https://dev.to/thepracticaldev/daily-challenge-3-vowel-counter-34ni";
}

export const vowelCounter = (string: string) => {
  return (`${string}`.match(/[aeiou]/gi) || "").length;
};

console.log(`${str} has ${vowelCounter(str)} vowels inside!`);
