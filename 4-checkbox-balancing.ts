/**
 * https://dev.to/thepracticaldev/daily-challenge-4-checkbook-balancing-hei
 *
 * It's a solution for link above.
 * It's gonna need --allow-read=files option while running cause we are reading from a file :=)
 *
 * while looking around about permissions on Deno, i found this article on dev.to
 * https://dev.to/bmorearty/better-deno-security-ask-for-permission-at-runtime-1fnm
 * So I'm just gonna use it this way :)
 * so you can run with this with
 * deno run --unstable --allow-read 4-checkbox-balancing.ts
 */
import { readFileStr } from "https://deno.land/std/fs/mod.ts";

let readFiles = await Deno.permissions.query({ name: "read", path: "./files" });
if (readFiles.state === "prompt") {
  readFiles = await Deno.permissions.request({ name: "read", path: "./files" });
}

const round = (number: number) => Math.round(number * 100) / 100;

const cleanText = (textToClean: string) =>
  textToClean.replace(/[^A-Za-z0-9\s\.]/gim, "").split("\n");

let text = cleanText(await readFileStr("./files/4-checkbook-balancing.txt"));

let originalBalance: number = parseFloat(text.shift() ?? "0");

let totalExpense = 0;
let expenses: number[] = [];

let lines = text
  .map((ch) => {
    let [number, type, expense] = ch.split(" ");
    let numberExpense = parseFloat(expense);

    totalExpense += numberExpense;
    expenses.push(numberExpense);

    const currentBalance = originalBalance - numberExpense;

    return [number, type, numberExpense, currentBalance];
  })
  .sort()
  .map((ch) => {
    let [number, type, numberExpense, currentBalance] = ch;
    return `${number} ${type} ${round(
      Number(numberExpense)
    )} --> Current Balance: ${currentBalance}`;
  })
  .join("\n");

const avarage = round(
  expenses.reduce((total, sum) => total + sum) / expenses.length
);

console.log(`
Original Balance: ${originalBalance}
${lines}
Total Expense: ${round(totalExpense)}
Money left: ${round(originalBalance - totalExpense)}
Average Expense: ${avarage}
`);
