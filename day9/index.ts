const day9 = async () => {
  const input = (await Deno.readTextFile("./input.txt")).split("\n");

  const part1 = () => {
    for (let index = 25; index < input.length; index++) {
      const target = +input[index];
      const lastTweentyFive = input.slice(index - 25, index);
      const values: number[] = [];
      lastTweentyFive.forEach((first) =>
        lastTweentyFive.forEach((second) =>
          first !== second ? values.push(+first + +second) : []
        )
      );
      if (!values.includes(target)) return target;
    }
  };

  const part2 = () => {
    const invalidNumber = part1();
    for (let index = 2; index < input.length; index++) {
      for (let index2 = 0; index2 < input.length; index2++) {
        const range = input.slice(index2, index2 + index).map((x) => +x);
        const sum = range.reduce((a, b) => a + b, 0);
        if (sum === invalidNumber) {
          const min = Math.min.apply(Math, range);
          const max = Math.max.apply(Math, range);
          return console.log(min + max);
        }
      }
    }
  };
  console.log(part1());
  part2();
};
await day9();
