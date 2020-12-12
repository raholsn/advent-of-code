const day10 = async () => {
  const input = (await Deno.readTextFile("./input.txt"))
    .split("\n")
    .map((x) => +x)
    .sort((a, b) => a - b);

  const part1 = () => {
    let nrOf1s = 1;
    let nrOf3s = 1;
    for (let i = 0; i < input.length; i++) {
      const joltage = input[i];
      const range = input.slice(i, i + 2);

      while (range.length != 0) {
        const otherJoltage = range.shift() as number;
        const difference = otherJoltage - joltage;
        if (difference === 3) nrOf3s++;
        if (difference === 1) nrOf1s++;
      }
    }
    console.log(nrOf1s * nrOf3s);
  };

  const part2 = () => {};

  part1();
};
await day10();
