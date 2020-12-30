export const p2 = async () => {
  const isActive = (char: string) => char === '#';
  const toCube = (x: number, y: number, z: number, w: number) =>
    `${x},${y},${z},${w}`;
  const cubeToCoordinates = (c: string) => {
    const [x, y, z, w] = c.split(',');
    return { x: +x, y: +y, z: +z, w: +w };
  };

  const remainActive = (activeCount: number) =>
    activeCount === 2 || activeCount === 3;

  const cycle = (activeCubes: Set<string>) => {
    const newActiveCubes = new Set<string>();
    const newAdjacents: Record<string, number> = {};

    for (const cube of activeCubes)
      addNewActiveCubes(newAdjacents, activeCubes, newActiveCubes, cube);

    return appendPossibleCubes(newAdjacents, newActiveCubes);
  };

  const appendPossibleCubes = (
    newAdjacents: Record<string, number>,
    newActiveCubes: Set<string>
  ) => {
    for (const possibleCube in newAdjacents)
      if (newAdjacents[possibleCube] === 3) newActiveCubes.add(possibleCube);

    return newActiveCubes;
  };

  const addNewActiveCubes = (
    newAdjacents: Record<string, number>,
    activeCubes: Set<string>,
    newActiveCubes: Set<string>,
    cube: string
  ) => {
    const adjacents = getAdjacents(cube);
    let activeAdjacentsCount = 0;
    for (const adjacent of adjacents) {
      if (activeCubes.has(adjacent)) activeAdjacentsCount += 1;
      else {
        if (!(adjacent in newAdjacents)) newAdjacents[adjacent] = 0;
        newAdjacents[adjacent] += 1;
      }
    }

    if (remainActive(activeAdjacentsCount)) newActiveCubes.add(cube);
  };

  const getInitialCubes = (input: string[]): Set<string> => {
    const cubes = new Set<string>();
    for (let x = 0; x < input.length; x += 1)
      for (let y = 0; y < input[0].length; y += 1)
        if (isActive(input[x][y])) cubes.add(toCube(x, y, 0, 0));

    return cubes;
  };

  const getAdjacents = (cube: string) => {
    const coordinate = cubeToCoordinates(cube);
    const adjacents = new Set<string>();

    for (let x = -1; x <= 1; x += 1)
      for (let y = -1; y <= 1; y += 1)
        for (let z = -1; z <= 1; z += 1)
          for (let w = -1; w <= 1; w += 1)
            adjacents.add(
              toCube(
                coordinate.x + x,
                coordinate.y + y,
                coordinate.z + z,
                coordinate.w + w
              )
            );

    adjacents.delete(cube);
    return adjacents;
  };

  const part2 = async () => {
    const input = (await Deno.readTextFile('./input.txt')).split('\n');
    let activeCubes = getInitialCubes(input);
    for (let i = 0; i < 6; i++) activeCubes = cycle(activeCubes);
    return activeCubes.size;
  };

  console.log(await part2());
};
