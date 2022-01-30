const day13 = async () => {
  const input = (await Deno.readTextFile('./input.txt')).split('\n\n');

  function initGrid(maxY: number, maxX: number) {
    const grid: string[][] = [];
    for (let y = 0; y < maxY; y++) {
      grid[y] = [];
      for (let x = 0; x < maxX; x++) {
        grid[y][x] = '.';
      }
    }

    return grid;
  }

  function fillGrid(initialGrid: string[][], cords: string[][]) {
    for (const cord of cords) {
      const x = parseInt(cord[0]);
      const y = parseInt(cord[1]);
      initialGrid[y][x] = '#';
    }
    return initialGrid;
  }

  function foldY(grid: string[][], value: number) {
    const arr1 = grid;
    const arr2 = arr1.splice(value + 1, value + 1);
    arr1.pop();
    arr2.reverse();
    return appendFold(arr1, arr2);
  }

  function foldX(grid: string[][], value: number) {
    const arr1 = grid;
    const arr2 = arr1.map((x) => x.splice(value + 1, value + 1));
    arr1.forEach((x) => x.pop())!;
    arr1.forEach((x) => x.reverse());
    return appendFold(arr1, arr2);
  }

  function appendFold(arr1: string[][], arr2: string[][]) {
    for (let j = 0; j < arr2.length; j++) {
      for (let i = 0; i < arr2[j].length; i++) {
        if (arr2[j][i] === '#') arr1[j][i] = arr2[j][i];
        else if (arr1[j][i] === '#') continue;
      }
    }

    return arr1;
  }

  function Calc(firstFoldingOnly: boolean): string[][] {
    const cords = input[0].split('\n').map((x) => x.split(','));

    const maxX = Math.max(...cords.map((x) => parseInt(x[0]) + 1));
    const maxY = Math.max(...cords.map((x) => parseInt(x[1]) + 1));
    const initialGrid = initGrid(maxY, maxX);
    let grid = fillGrid(initialGrid, cords);

    const folding = input[1]
      .replaceAll('fold along ', '')
      .split('\n')
      .map((x) => x.split('='));

    for (const fold of firstFoldingOnly ? [folding[0]] : folding) {
      const foldType = fold[0];
      const foldValue = parseInt(fold[1]);

      switch (foldType) {
        case 'y': {
          grid = foldY(grid, foldValue);
          break;
        }
        case 'x':
          grid = foldX(grid, foldValue);
          break;
        default:
          throw new Error(`Unsupported foldType: ${foldType}`);
      }
    }

    return grid;
  }

  const assignment1 = () => {
    const grid = Calc(true);
    console.log(
      grid.map((x) => x.filter((y) => y === '#').length).reduce((a, b) => a + b)
    );
  };

  const assignment2 = () => {
    const grid = Calc(false);
    grid.forEach((line) => line.reverse() && console.log(line.join(' ')));
  };

  assignment1();
  assignment2();
};

await day13();
