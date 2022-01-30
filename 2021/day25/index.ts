const day25 = async () => {
  const input = (await Deno.readTextFile('./input.txt'))
    .split('\n')
    .map((x) => x.split(''));

  enum Herd {
    None = '.',
    EastMoving = '>',
    SouthMoving = 'v',
  }

  const copy = (newInput: string[][]) => JSON.parse(JSON.stringify(newInput)); //deep copy

  const getSeaCucumber = (
    newInput: string[][],
    y: number,
    x: number,
    herd: Herd
  ) => {
    switch (herd) {
      case Herd.EastMoving:
        return newInput[y][x + 1] === undefined
          ? {
              x: 0,
              y: y,
              herd: newInput[y][0] as Herd,
            }
          : {
              x: x + 1,
              y: y,
              herd: newInput[y][x + 1] as Herd,
            };
      case Herd.SouthMoving:
        return newInput[y + 1] === undefined
          ? {
              x: x,
              y: 0,
              herd: newInput[0][x] as Herd,
            }
          : {
              x: x,
              y: y + 1,
              herd: newInput[y + 1][x] as Herd,
            };
      default:
        throw new Error('Invalid direction');
    }
  };

  const move = (newInput: string[][], herd: Herd) => {
    const nextInput: string[][] = copy(newInput);
    for (let y = 0; y < newInput.length; y++) {
      for (let x = 0; x < newInput[0].length; x++) {
        const current = newInput[y][x];
        if (current !== herd) continue;
        const next = getSeaCucumber(newInput, y, x, herd);
        if (next.herd !== Herd.None) continue;
        nextInput[next.y][next.x] = current;
        nextInput[y][x] = next.herd;
      }
    }
    return nextInput;
  };

  const hasChanged = (prevInput: string[][], newInput: string[][]): boolean =>
    prevInput.join('') !== newInput.join('');

  const assignment1 = () => {
    let newInput: string[][] = copy(input);
    let prevInput = copy(newInput);
    let steps = 1;
    while (true) {
      prevInput = newInput;
      newInput = move(newInput, Herd.EastMoving);
      newInput = move(newInput, Herd.SouthMoving);
      if (!hasChanged(prevInput, newInput)) {
        break;
      }

      steps++;
    }

    console.log(`assignment1: ${steps}`);
  };

  const assignment2 = () => console.log(`assignment2: ${'"boost the signal"'}`);

  assignment1();
  assignment2();
};

await day25();
