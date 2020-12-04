const day3 = async () => {
  interface Location {
    xCordinate: number;
    yCordinate: number;
    entity: "#" | ".";
  }

  interface CurrentPosition {
    xCordinate: number;
    yCordinate: number;
  }

  const input = (await Deno.readTextFile("./input.txt")).split("\n");

  const map = input.map((mapRow, yCordinate) => {
    return [...mapRow].map<Location>((letter, xCordinate) => ({
      xCordinate,
      yCordinate,
      entity: letter === "#" ? "#" : ".",
    }));
  });

  const countTrees = (
    yIncrement: number,
    xIncrement: number,
    position: CurrentPosition = { xCordinate: 0, yCordinate: 0 },
    // deno-lint-ignore no-inferrable-types
    treeHits: number = 0
  ): number => {
    if (position.yCordinate >= input.length) return treeHits;

    const location =
      map[position.yCordinate][position.xCordinate % input[0].length];
    if (location.entity === "#") {
      treeHits++;
    }
    position.xCordinate += xIncrement;
    position.yCordinate += yIncrement;
    return countTrees(yIncrement, xIncrement, position, treeHits);
  };

  const part1 = () => {
    console.log(countTrees(1, 3));
  };

  const part2 = () => {
    console.log(
      countTrees(1, 1) *
        countTrees(1, 3) *
        countTrees(1, 5) *
        countTrees(1, 7) *
        countTrees(2, 1)
    );
  };

  part1();
  part2();
};

await day3();
