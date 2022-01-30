const day21 = async () => {
  interface Range {
    min: number;
    max: number;
  }

  interface Cube {
    id: number;
    x: Range;
    y: Range;
    z: Range;
    state?: CubeState;
    combinations?: number;
  }

  enum CubeState {
    on = 1,
    off = 2,
  }

  interface Operation {
    op: 'on' | 'off';
    Cube: Cube;
  }

  const getNumberOfCombinations = (cube: Cube): number => {
    const x = cube.x.max - cube.x.min + 1;
    const y = cube.y.max - cube.y.min + 1;
    const z = cube.z.max - cube.z.min + 1;

    if (x === 1 && y === 1 && z === 1) return 3 * 3 * 3;
    return x * y * z;
  };

  const operations = (await Deno.readTextFile('./input.txt'))
    .split('\n')
    .map((row, id) => {
      const [op, cords] = row.split(' ');
      const [x, y, z] = cords.split(',');
      const [x1, x2] = x.replace('x=', '').split('..');
      const [y1, y2] = y.replace('y=', '').split('..');
      const [z1, z2] = z.replace('z=', '').split('..');
      const cube: Cube = {
        id: id + 1,
        x: {
          min: Number(x1),
          max: Number(x2),
        },
        y: {
          min: Number(y1),
          max: Number(y2),
        },
        z: {
          min: Number(z1),
          max: Number(z2),
        },
      };
      cube.combinations = getNumberOfCombinations(cube);

      return {
        op,
        Cube: cube,
      } as Operation;
    });

  const getCubesThatAreInRange = (cube: Cube, Cubes: Cube[]): Cube[] => {
    return Cubes.filter((c) => {
      return (
        c.x.min <= cube.x.max &&
        c.x.max >= cube.x.min &&
        c.y.min <= cube.y.max &&
        c.y.max >= cube.y.min &&
        c.z.min <= cube.z.max &&
        c.z.max >= cube.z.min
      );
    });
  };

  const updateCubeRanges = (
    turnedOnCubes: Cube[],
    cubesInRange: Cube[],
    op: Operation
  ): void => {
    cubesInRange.forEach((cubeInRange) => {
      console.log({ cubeInRange });

      if (op.op === 'on') {
        cubeInRange.x.min = Math.min(op.Cube.x.min, cubeInRange.x.min);
        cubeInRange.x.max = Math.max(op.Cube.x.max, cubeInRange.x.max);
        cubeInRange.y.min = Math.min(op.Cube.y.min, cubeInRange.y.min);
        cubeInRange.y.max = Math.max(op.Cube.y.max, cubeInRange.y.max);
        cubeInRange.z.min = Math.min(op.Cube.z.min, cubeInRange.z.min);
        cubeInRange.z.max = Math.max(op.Cube.z.max, cubeInRange.z.max);
      } else {
        cubeInRange.x.min = Math.max(op.Cube.x.min, cubeInRange.x.min);
        cubeInRange.x.max = Math.min(op.Cube.x.max - 1, cubeInRange.x.max);
        cubeInRange.y.min = Math.max(op.Cube.y.min, cubeInRange.y.min);
        cubeInRange.y.max = Math.min(op.Cube.y.max - 1, cubeInRange.y.max);
        cubeInRange.z.min = Math.max(op.Cube.z.min, cubeInRange.z.min);
        cubeInRange.z.max = Math.min(op.Cube.z.max - 1, cubeInRange.z.max);
      }

      cubeInRange.combinations = getNumberOfCombinations(cubeInRange);

      const newTurnedOnCubes = turnedOnCubes.filter(
        (c) => c.id === cubeInRange.id
      );
      newTurnedOnCubes.push(cubeInRange);
    });
  };

  //need to save ranges that have been counted

  const assignment1 = () => {
    const currTurnedOnCubes: Cube[] = [];
    let lightCounter = 0;
    operations.forEach((op, i) => {
      console.log(currTurnedOnCubes);
      const cubesInRange = getCubesThatAreInRange(op.Cube, currTurnedOnCubes);

      if (cubesInRange.length === 0 && op.op === 'on') {
        currTurnedOnCubes.push(op.Cube);
        lightCounter += getNumberOfCombinations(op.Cube);
      }

      updateCubeRanges(currTurnedOnCubes, cubesInRange, op);
    });

    // console.log(turnedOnCubes);
  };

  assignment1();

  const cube2: Cube = {
    id: 0,
    x: {
      min: 11,
      max: 13,
    },
    y: {
      min: 11,
      max: 13,
    },
    z: {
      min: 11,
      max: 13,
    },
  };

  const cube: Cube = {
    id: 0,
    x: {
      min: 10,
      max: 12,
    },
    y: {
      min: 10,
      max: 12,
    },
    z: {
      min: 10,
      max: 12,
    },
  };

  console.log(getNumberOfCombinations(cube2));
  console.log(getNumberOfCombinations(cube));
};

await day21();
