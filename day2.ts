import { input } from "./day2-input.ts";

/*
const input = `Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red
Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green`;
*/

const maxCubes = new Map<string, number>([
  ['red', 12],
  ['green', 13],
  ['blue', 14],
]);

class Game {

  constructor(private id: number, private draws: Map<string, number>[]) {}

  static fromLine( line: string): Game {
    let gameStr: string, drawListString: string;
    [gameStr, drawListString] = line.split(': ');
    const gameId = parseInt((gameStr.match(/\d+/) as string[])[0]);
    const drawList = drawListString.split(/; ?/).map( draws => {
      const drawMap = new Map<string, number>();
      draws.split(/, ?/).map( draw => {
        let drawNum: string, color: string;
        [drawNum, color] = draw.split(" ");
        drawMap.set(color, parseInt(drawNum))
      })
      return drawMap;
    });
    return new Game(gameId, drawList);
  }

  getId() { return this.id; }

  isPossible(): boolean {
    const impossibleGameFound = this.draws.some( draw => 
      Array.from(draw.entries()).some( 
        ([color, num]) => (maxCubes.get(color) as number) < num 
      )
    )
    return !impossibleGameFound;
  }

  power(): number {
    const highestNumberForColorMap = new Map<string, number>();
    this.draws.some( draw => 
      Array.from(draw.entries()).forEach( 
        ([color, num]) => {
          if ((highestNumberForColorMap.get(color) || 0) < num) {
            highestNumberForColorMap.set(color, num);
          }
        } 
      )
    )
    return Array.from(highestNumberForColorMap.values()).reduce( (product, value) => product * value, 1);
  }

}

const games = input.split("\n")
  .map( line => Game.fromLine(line) );

console.log(
  games.map( game => game.isPossible() ? game.getId() : 0 ).reduce( ( sum, id ) => sum + id )
);


// --- Part Two ---

console.log(
  games.map( game => game.power() ).reduce( (sum, power) => sum + power )
);
