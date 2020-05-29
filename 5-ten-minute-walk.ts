/**
 * https://dev.to/thepracticaldev/daily-challenge-5-ten-minute-walk-1188
 */

const args = Deno.args;

let minutes = +args[0];

export enum Rotations {
  UP,
  LEFT,
  RIGHT,
  DOWN,
}

if (!minutes) {
  throw new Error("Let me know how much you wanna walk? :)");
}

if (minutes % 2 !== 0) {
  minutes += 1;
  console.log(
    "You won't come back to home with that walk distance. Using this instead: " +
      minutes
  );
}

export const getRandom = (arr: Rotations[]) =>
  arr[Math.floor(Math.random() * arr.length)];

export function generateWalkSequence(time: number) {
  if (time % 2 != 0) throw new Error("Time must be even");
  let walkSequence = [];
  let oppositeDirections = [];
  let nextDirection = Rotations.UP;

  const directions = [
    Rotations.LEFT,
    Rotations.UP,
    Rotations.DOWN,
    Rotations.RIGHT,
  ];
  for (let i = 0; i < time / 2; i++) {
    // loop selection after index 3
    walkSequence[i] = nextDirection = getRandom(directions);
    oppositeDirections[i] = getComplement(nextDirection);
  }
  return [...walkSequence, ...oppositeDirections.reverse()].map(
    (ch) => Rotations[ch]
  );
}

export function getComplement(direction: Rotations) {
  switch (direction) {
    case Rotations.UP:
      return Rotations.DOWN;
    case Rotations.DOWN:
      return Rotations.UP;
    case Rotations.LEFT:
      return Rotations.RIGHT;
    case Rotations.RIGHT:
      return Rotations.LEFT;
  }
}

console.log(generateWalkSequence(minutes));
