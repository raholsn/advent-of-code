const day11 = async () => {
  const input = (await Deno.readTextFile("./input.txt"))
    .split("L")
    .join("#")
    .split("\n")
    .map((x) => x.split(""));

  const isEmpty = (position: string) => position === "L";
  const isFloor = (position: string) => position === ".";
  const isAdjacentOccupied = (occupiedRange: string[]) =>
    occupiedRange.length >= 4 && occupiedRange.every((x) => x === "#");

  const isNoAdjacentOccupiedSeats = (occupiedRange: string[]) =>
    !occupiedRange.some((x) => x === "#");

  const isEqual = (list1: string[][], list2: string[][]) => {
    for (let index = 0; index < list1.length; index++) {
      for (let index2 = 0; index2 < list1.length; index2++) {
        if (list1[index][index2] != list2[index][index2]) return false;
      }
    }
    return true;
  };

  const part1 = () => {
    let i = 0;
    while (i != -1) {
      const ic = JSON.parse(JSON.stringify(input));
      for (let index = 0; index < input.length; index++) {
        for (let index2 = 0; index2 < input[index].length; index2++) {
          const seat = ic[index][index2];
          if (isFloor(seat)) continue;

          const adjacentSeats = [
            ic[index][index2 - 1], //left
            ic[index][index2 + 1], //right
            ic[index - 1] !== undefined ? ic[index - 1][index2] : [""], //top
            ic[index - 1] !== undefined ? ic[index - 1][index2 - 1] : [""], //top left
            ic[index - 1] !== undefined ? ic[index - 1][index2 + 1] : [""], //top right
            ic[index + 1] !== undefined ? ic[index + 1][index2] : [""], //below
            ic[index + 1] !== undefined ? ic[index + 1][index2 - 1] : [""], //top left
            ic[index + 1] !== undefined ? ic[index + 1][index2 + 1] : [""], //top right
          ] as string[];

          if (isEmpty(seat)) {
            if (isNoAdjacentOccupiedSeats(adjacentSeats))
              input[index][index2] = "#";
          } else {
            if (isAdjacentOccupied(adjacentSeats.filter((x) => x === "#"))) {
              input[index][index2] = "L";
            }
          }
        }
      }

      if (isEqual(ic, input)) i = -1;
    }

    let hash = 0;
    input.forEach((element) => {
      element.forEach((element2) => {
        if (element2 === "#") hash++;
      });
    });

    return hash;
  };

  console.log(part1());
};

await day11();
