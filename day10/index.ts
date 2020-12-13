const day10 = async () => {
  const input = (await Deno.readTextFile("./input.txt"))
    .split("\n")
    .map((x) => +x)
    .sort((a, b) => a - b);

  input.unshift(0);

  const part1 = () => {
    let nrOf1s = 0;
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

  const part2 = () => {
    const count: number[] = [1];
    for (let i = 0; i < input.length; i++) {
      const range = input.slice(0, i);
      for (let j = 0; j < range.length; j++) {
        const difference = input[i] - input[j];
        if (difference <= 3) {
          if (count[i] === undefined) count[i] = 0;
          if (count[j] === undefined) count[j] = 0;
          count[i] += count[j];
        }
      }
    }

    console.log(count[input.length - 1]);
  };

  part1();
  part2();
};
await day10();
