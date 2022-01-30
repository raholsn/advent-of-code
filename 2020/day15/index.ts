const day15 = async () => {
  const playGame = async (turnLength: number) => {
    const numbers = (await Deno.readTextFile("./input.txt"))
      .split(",")
      .map((x) => +x);

    let lastNumber = numbers.pop() as number;
    const spokenNumbers = new Map();
    numbers.forEach((number, index) => spokenNumbers.set(number, index + 1));
    let turn = numbers.length + 1;
    while (turn != turnLength) {
      let lastSpokenNumber = spokenNumbers.get(lastNumber);
      if (!lastSpokenNumber) lastSpokenNumber = 0;
      else lastSpokenNumber = turn - spokenNumbers.get(lastNumber);
      spokenNumbers.set(lastNumber, turn);
      lastNumber = lastSpokenNumber;
      turn++;
    }
    return lastNumber;
  };

  const part1 = async () => await playGame(2020);

  const part2 = async () => await playGame(30000000);

  console.log(await part1());
  console.log(await part2());
};

await day15();
