const day5 = async () => {
  const calculateRange = (min: number, max: number): number => {
    return max - Math.round((max - min) / 2);
  };

  const calculateLetters = (seatNumbers: string[], numberOfSeats: 127 | 7) => {
    let max = +numberOfSeats + 1;
    let min = 0;
    seatNumbers.forEach((letter) => {
      switch (letter) {
        case "F":
        case "L":
          max = calculateRange(min, max);
          break;
        case "B":
        case "R":
          min = calculateRange(min, max);
          break;
        default:
          throw Error("seatLetter not supported");
      }
    });
    return min;
  };

  const calculateSeating = (seatNumber: string) => {
    const rowSeatingNumbers = seatNumber.split("").slice(0, 7);
    const columnSeatingNumbers = seatNumber.split("").slice(7, 10);
    const row = calculateLetters(rowSeatingNumbers, 127);
    const column = calculateLetters(columnSeatingNumbers, 7);
    const seatId = +row * 8 + +column;
    return seatId;
  };

  const part1 = async () => {
    const maxSeatId = (await Deno.readTextFile("./input.txt"))
      .split("\n")
      .reduce((prevSeatId, seatNumber) => {
        const seatId = calculateSeating(seatNumber);
        return seatId > prevSeatId ? seatId : prevSeatId;
      }, 0);

    console.log(maxSeatId);
  };

  const part2 = async () => {
    const seatId = (await Deno.readTextFile("./input.txt"))
      .split("\n")
      .map((seatNumber) => calculateSeating(seatNumber))
      .sort((a, b) => a - b)
      .find((id, index, array) => array[index + 1] !== id + 1);

    console.log((seatId as number) + 1);
  };

  await part1();
  await part2();
};

await day5();
