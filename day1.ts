import { input } from "./day1-input.ts";

/*
const input = `1abc2
pqr3stu8vwx
a1b2c3d4e5f
treb7uchet`;
*/

console.log(input.split("\n")
  .map( (line: string) => line.match(/\d/)[0] + line.match(/.*(\d)/)[1] )
  .reduce( (sum : number, numString: string) => sum + parseInt(numString), 0 )  
)

// --- Part Two ---

/*
const input = `two1nine
eightwothree
abcone2threexyz
xtwone3four
4nineeightseven2
zoneight234
7pqrstsixteen`;
*/

let stringToDigit = new Map<string, number>([
  ["one", 1],
  ["two", 2],
  ["three", 3],
  ["four", 4],
  ["five", 5],
  ["six", 6],
  ["seven", 7],
  ["eight", 8],
  ["nine", 9],
  ["zero", 0]
]);

for (let i = 0; i < 10; i++) { stringToDigit.set("" + i, i); }

const regexString = '(' + [ ...stringToDigit.keys() ].join('|') + ')'; 
const regex1 = new RegExp(regexString);
const regex2 = new RegExp('.*' + regexString);

console.log(input.split("\n")
  .map( (line: string) => 
    stringToDigit.get(line.match(regex1)[1]) * 10 + stringToDigit.get(line.match(regex2)[1]) 
  )
  .reduce( (sum : number, numString: number) => sum + parseInt(numString), 0 )  
)