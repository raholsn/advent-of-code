const day4 = async () => {
  const game = (await Deno.readTextFile('./input.txt')).split(
    '\n\n'
  ) as string[];
  const numbers = game.shift()!.split(',');
  const boards = game.map((x) =>
    x.split('\n').map((x) => x.split(' ').filter((y) => y !== ''))
  );

  function filterResult(board: string[][], index: number) {
    const filteredBoard = board.map((x) => {
      const filtered = x.filter((y) => !y.includes('('));
      return filtered;
    });

    return {
      sumOfAllUnmarked: +filteredBoard
        .join()
        .split(',')
        .filter((x) => x !== '')
        .reduce((prev, curr) => (+prev + +curr).toString()),
      mostRecentNumber: +numbers[index],
    };
  }

  function calc1(numbers: string[], boards: string[][][]) {
    for (let i = 0; i < numbers.length; i++) {
      for (let j = 0; j < boards.length; j++) {
        for (let x = 0; x < boards[j].length; x++) {
          for (let y = 0; y < boards[j][x].length; y++) {
            if (boards[j][x][y] === numbers[i]) {
              boards[j][x][y] = `(${numbers[i]})`;
            }

            if (
              HasBingoForRow(boards[j][x]) ||
              HasBingoForColumn(boards[j], x)
            ) {
              return filterResult(boards[j], i);
            }
          }
        }
      }
    }
  }

  function HasBingoForRow(board: string[]) {
    return board.every((x) => x.includes('('));
  }

  function HasBingoForColumn(board: string[][], column: number) {
    for (let i = 0; i < board.length; i++) {
      if (board[i][column].indexOf('(') < 0) return false;
    }

    return true;
  }

  function calc2(numbers: string[], boards: string[][][]) {
    const boardsWon = new Map<string[][], number>();
    for (let i = 0; i < numbers.length; i++) {
      for (let j = 0; j < boards.length; j++) {
        for (let x = 0; x < boards[j].length; x++) {
          if (boardsWon.has(boards[j])) break;
          for (let y = 0; y < boards[j][x].length; y++) {
            if (boards[j][x][y] === numbers[i]) {
              boards[j][x][y] = `(${numbers[i]})`;
            }

            if (
              HasBingoForRow(boards[j][x]) ||
              HasBingoForColumn(boards[j], x)
            ) {
              boardsWon.set(boards[j], i);
              break;
            }
          }
        }
      }
    }
    const lastBoard = Array.from(boardsWon)[boardsWon.size - 1];
    return filterResult(lastBoard[0], +lastBoard[1]);
  }

  const assignment1 = () => {
    const { mostRecentNumber, sumOfAllUnmarked } = calc1(numbers, boards)!;
    console.log(mostRecentNumber * sumOfAllUnmarked);
  };

  const assignment2 = () => {
    const { mostRecentNumber, sumOfAllUnmarked } = calc2(numbers, boards)!;
    console.log(mostRecentNumber * sumOfAllUnmarked);
  };

  assignment1();
  assignment2();
};

await day4();
