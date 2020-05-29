/**
 * https://dev.to/thepracticaldev/daily-challenge-7-factorial-decomposition-176o
 *
 * The question is quite interesting one.
 * So I'll peek into others code and copy a bit. I'm not sure if i can figure it out by my self :)
 */

/*
  Today's challenge will require a bit of mathematical prowess. Those who were fans of the Project Euler challenges might have some fun with this one from user g964 from CodeWars:

  The aim of this [challenge] is to decompose n!(factorial n) into its prime factors. Prime numbers should be in increasing order. When the exponent of a prime number is 1, don't print the exponent.

  Examples:
  n = 22; decomp(22) -> "219 * 39 * 54 * 73 * 112 * 13 * 17 * 19"
  n = 25; decomp(25) -> "222 * 310 * 56 * 73 * 112 * 13 * 17 * 19 * 23"

  Explanation:
  n = 12; decomp(12) -> "210 * 35 * 52 * 7 * 11"
  12! is divisible by 2 ten times, by 3 five times, by 5 two times and by 7 and 11 only once.
*/

const { args } = Deno;

let numberToDecomp = +args[0];

const decomp = (number: number) => {
  // function that adds the dividers of a number to a "dividers object"
  const subdecomp = (number: number, subdividers: number[]) => {
    let remainder = number;

    // from 2 to square root of the number
    for (let x = 2; x <= Math.sqrt(number); x++) {
      // check if it can divide the number
      if (remainder % x === 0) {
        // add it as a key to a results object
        if (!subdividers[x]) subdividers[x] = 0;
        // while it can be a divisor, add +1 to the key and update number
        while (remainder % x === 0) {
          subdividers[x]++;
          remainder = remainder / x;
        }
      }
    }
    // if after all there's still a remaining number, it is a divisor too
    if (remainder > 1) {
      if (!subdividers[remainder]) subdividers[remainder] = 1;
      else subdividers[remainder] += 1;
    }
    return subdividers;
  };

  // initial dividers: none!
  let dividers: number[] = [];

  // calculate the dividers for each number used in the factorial
  for (let x = 2; x <= number; x++) {
    dividers = subdecomp(x, dividers);
  }

  // generate a html string with the result
  return Object.keys(dividers).reduce(
    (acc, curr: any) =>
      dividers[curr] === 1
        ? `${acc} ${curr}`
        : `${acc} ${curr}^${dividers[curr]}`,
    `decomp(${number}) = `
  );
};

console.log(decomp(numberToDecomp));
