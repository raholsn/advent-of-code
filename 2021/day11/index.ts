const day11 = async () => {
  let input = (await Deno.readTextFile('./input.txt'))
    .split('\n')
    .map((x) => x.split('').map((x) => parseInt(x)));

  function bump(grid: { val: number | undefined; x: number; y: number }[][]) {
    for (let y = 0; y < grid.length; y++) {
      for (let x = 0; x < grid[y].length; x++) {
        if (grid[y][x].val !== undefined) {
          if (grid[y][x].val! < 10000) {
            grid[y][x].val = 1 + grid[y][x].val!;
          }
        }
      }
    }

    return grid;
  }

  function addToInput(
    grid: { val: number | undefined; x: number; y: number }[][],
    input: number[][]
  ) {
    for (let y = 0; y < grid.length; y++) {
      for (let x = 0; x < grid[y].length; x++) {
        if (grid[y][x].val !== undefined) {
          const dx = grid[y][x].x;
          const dy = grid[y][x].y;
          input[dy][dx] = grid[y][x].val!;
        }
      }
    }
  }

  function getNineCord(input: number[][]) {
    for (let y = 0; y < input.length; y++) {
      for (let x = 0; x < input[y].length; x++) {
        if (input[y][x] > 9 && input[y][x] !== 10000) {
          input[y][x] = 10000;
          return { y: y, x: x };
        }
      }
    }
  }

  const assignment = () => {
    const rows = input.length;
    const cols = input[0].length;

    let steps = 0;
    let flashes = 0;
    let exist = false;
    while (!exist) {
      if (exist) break;

      for (let y = 0; y < input.length; y++) {
        for (let x = 0; x < input[y].length; x++) {
          input[y][x] = input[y][x] + 1;
        }
      }

      while (input.some((x) => x.some((x) => x >= 9))) {
        const nineCord = getNineCord(input)!;

        if (nineCord === undefined) {
          if (input.every((x) => x.every((x) => x === 10000))) {
            exist = true;
          }
          input = input.map((x) =>
            x.map((y) => {
              if (y === 10000) {
                flashes++;
                return 0;
              }
              return y;
            })
          );
          break;
        }
        const y = nineCord.y;
        const x = nineCord.x;
        const val = input[y][x];

        const up = y - 1 >= 0 ? input[y - 1][x] : undefined;
        const down = y + 1 >= rows ? undefined : input[y + 1][x];
        const right = x + 1 >= cols ? undefined : input[y][x + 1];
        const left = x - 1 >= 0 ? input[y][x - 1] : undefined;

        const upLeft =
          y - 1 >= 0 && x - 1 >= 0 ? input[y - 1][x - 1] : undefined;
        const upRight =
          y - 1 >= 0 && x + 1 < cols ? input[y - 1][x + 1] : undefined;
        const downLeft =
          y + 1 < rows && x - 1 >= 0 ? input[y + 1][x - 1] : undefined;
        const downRight =
          y + 1 < rows && x + 1 < cols ? input[y + 1][x + 1] : undefined;

        const grid = Array.from([
          [
            { val: upLeft, y: y - 1, x: x - 1 },
            { val: up, y: y - 1, x },
            { val: upRight, y: y - 1, x: x + 1 },
          ],
          [
            { val: left, y: y, x: x - 1 },
            { val: val, y: y, x },
            { val: right, y: y, x: x + 1 },
          ],
          [
            { val: downLeft, y: y + 1, x: x - 1 },
            { val: down, y: y + 1, x },
            { val: downRight, y: y + 1, x: x + 1 },
          ],
        ]);

        const newGrid = bump(grid);
        addToInput(newGrid, input);
      }
      steps++;
    }

    console.log(`Assignment 1: ${flashes}`);
    console.log(`Assignment 2: ${steps + 1}`);
  };

  assignment();
};

await day11();
