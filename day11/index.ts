const day11 = async () => {
  const isEmpty = (position: string) => position === "L";
  const isFloor = (position: string) => position === ".";
  const isAdjacentOccupied = (occupiedRange: string[]) =>
    occupiedRange.length >= 4 && occupiedRange.every((x) => x === "#");
  const isAdjacentOccupiedP2 = (occupiedRange: number) => occupiedRange >= 5;

  const isNotAdjacentOccupied = (occupiedRange: string[]) =>
    !occupiedRange.some((x) => x === "#");

  const isEqual = (list1: string[][], list2: string[][]) => {
    for (let index = 0; index < list1.length; index++) {
      for (let index2 = 0; index2 < list1.length; index2++) {
        if (list1[index][index2] != list2[index][index2]) return false;
      }
    }
    return true;
  };

  const part1 = async () => {
    const input = (await Deno.readTextFile("./input.txt"))
      .split("L")
      .join("#")
      .split("\n")
      .map((x) => x.split(""));

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
            if (isNotAdjacentOccupied(adjacentSeats))
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

  const calculateAdjacentDirections = (
    direction:
      | "left"
      | "right"
      | "top"
      | "topLeft"
      | "topRight"
      | "below"
      | "belowLeft"
      | "belowRight",
    index: number,
    index2: number,
    ic: string[][],
    // deno-lint-ignore no-inferrable-types
    xCount: number = 0
  ) => {
    switch (direction) {
      case "left":
        for (let i = index2; i >= 0; i--) {
          if (ic[index][i - 1] === undefined) return "";
          if (ic[index][i - 1] === "L" || ic[index][i - 1] === "#")
            return ic[index][i - 1];
        }

        break;
      case "right":
        for (let i = index2; i < ic[index].length; i++) {
          if (ic[index][i + 1] === undefined) return "";
          if (ic[index][i + 1] === "L" || ic[index][i + 1] === "#")
            return ic[index][i + 1];
        }
        break;
      case "top":
        for (let i = index; i >= 0; i--) {
          if (ic[i - 1] === undefined) return "";
          if (ic[i - 1][index2] === "L" || ic[i - 1][index2] === "#")
            return ic[i - 1][index2];
        }

        break;
      case "topLeft":
        for (let i = index; i >= 0; i--) {
          xCount++;
          if (ic[i - 1] === undefined) return "";
          if (ic[i - 1][index2 - xCount] === undefined) return "";
          if (
            ic[i - 1][index2 - xCount] === "L" ||
            ic[i - 1][index2 - xCount] === "#"
          )
            return ic[i - 1][index2 - xCount];
        }

        break;
      case "topRight":
        for (let i = index; i >= 0; i--) {
          xCount++;
          if (ic[i - 1] === undefined) return "";
          if (ic[i - 1][index2 + xCount] === undefined) return "";
          if (
            ic[i - 1][index2 + xCount] === "L" ||
            ic[i - 1][index2 + xCount] === "#"
          )
            return ic[i - 1][index2 + xCount];
        }
        break;
      case "below":
        for (let i = index; i < ic[index].length; i++) {
          if (ic[i + 1] === undefined) return "";
          if (ic[i + 1][index2] === undefined) return "";
          if (ic[i + 1][index2] === "L" || ic[i + 1][index2] === "#")
            return ic[i + 1][index2];
        }
        break;
      case "belowLeft":
        for (let i = index; i < ic[index].length; i++) {
          xCount++;
          if (ic[i + 1] === undefined) return "";
          if (ic[i + 1][index2 - xCount] === undefined) return "";
          if (
            ic[i + 1][index2 - xCount] === "L" ||
            ic[i + 1][index2 - xCount] === "#"
          )
            return ic[i + 1][index2 - xCount];
        }
        break;
      case "belowRight":
        for (let i = index; i < ic[index].length; i++) {
          xCount++;
          if (ic[i + 1] === undefined) return "";
          if (ic[i + 1][index2 + xCount] === undefined) return "";
          if (
            ic[i + 1][index2 + xCount] === "L" ||
            ic[i + 1][index2 + xCount] === "#"
          )
            return ic[i + 1][index2 + xCount];
        }
        break;
      default:
        throw Error();
    }
  };

  const part2 = async () => {
    const input = (await Deno.readTextFile("./input.txt"))
      .split("L")
      .join("#")
      .split("\n")
      .map((x) => x.split(""));

    let i = 1;
    while (i != -1) {
      const ic = JSON.parse(JSON.stringify(input));
      for (let index = 0; index < input.length; index++) {
        for (let index2 = 0; index2 < input[index].length; index2++) {
          const seat = ic[index][index2];
          if (isFloor(seat)) continue;

          const adjacentSeats = [
            calculateAdjacentDirections("left", index, index2, ic),
            calculateAdjacentDirections("right", index, index2, ic),
            calculateAdjacentDirections("top", index, index2, ic),
            calculateAdjacentDirections("topLeft", index, index2, ic),
            calculateAdjacentDirections("topRight", index, index2, ic),
            calculateAdjacentDirections("below", index, index2, ic),
            calculateAdjacentDirections("belowLeft", index, index2, ic),
            calculateAdjacentDirections("belowRight", index, index2, ic),
          ] as string[];

          if (isEmpty(seat)) {
            if (isNotAdjacentOccupied(adjacentSeats))
              input[index][index2] = "#";
          } else {
            if (
              isAdjacentOccupiedP2(
                adjacentSeats.filter((x) => x === "#").length
              )
            ) {
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
  console.log(await part1());
  console.log(await part2());
};

await day11();
