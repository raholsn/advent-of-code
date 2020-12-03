const day2 = async () => {
  const part1 = async () =>
    (await Deno.readTextFile("./input.txt"))
      .split("\n")
      .reduce((occurences, row) => {
        const password = row.split(" ")[2];
        const minOccurence = +row.split("-")[0];
        const maxOccurence = +row.split("-")[1].split(" ")[0];
        const letter = row.split(" ")[1][0];

        const isMinValid = password.split(letter).length > minOccurence;
        const isMaxValid = password.split(letter).length <= maxOccurence + 1;

        return isMinValid && isMaxValid
          ? (+occurences + 1).toString()
          : occurences;
      }, "0");

  const part2 = async () =>
    (await Deno.readTextFile("./input.txt"))
      .split("\n")
      .reduce((occurences, row) => {
        const password = row.split(" ")[2];
        const digit1 = +row.split("-")[0];
        const digit2 = +row.split("-")[1].split(" ")[0];
        const letter = row.split(" ")[1][0];

        const isPositionForLetterOneOccuring = password[digit1 - 1] === letter;
        const isPositionForLetterTwoOccuring = password[digit2 - 1] === letter;

        //xor
        const isOnlyOneOccuring =
          isPositionForLetterOneOccuring !== isPositionForLetterTwoOccuring;

        return isOnlyOneOccuring ? (+occurences + 1).toString() : occurences;
      }, "0");

  console.log(await part1());
  console.log(await part2());
};

day2();
