/**
 * https://dev.to/thepracticaldev/daily-challenge-2-string-diamond-21n2
 *
 * the solution is from "@Vlad Barinov" from dev.to
 * I just like the solution so take it here!
 * It is really good vay!
 */
const { args } = Deno;

let middleWay = +args[0];

if (!middleWay) {
  throw new Error("A valid number argument must provide to run this example!");
}

if (middleWay % 2 === 0) {
  middleWay += 1;
  console.log("Given number should be odd, adding 1 for now, " + middleWay);
}

export const repeater = (ch: string) => (n: number) => ch.repeat(n);
export const spacer = repeater(" ");
export const asterixer = repeater("*");

export const drawDiamond = (numb: number): string => {
  let diam = "";
  for (let i = 1; i <= numb; i++) {
    const spaces = Math.abs(numb - (2 * i - 1));
    const stars = numb - spaces;
    diam += `${spacer(spaces / 2)}${asterixer(stars)}\n`;
  }
  return diam;
};

console.log(drawDiamond(middleWay));
