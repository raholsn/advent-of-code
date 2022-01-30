const day23 = async () => {
  const part1 = async (turns: number) => {
    const cups = (await Deno.readTextFile('./input.txt'))
      .split('')
      .map((x) => +x);

    let currentCup = cups[0];

    for (let i = 0; i < turns; i++) {
      const pickedUp: number[] = [];
      while (pickedUp.length < 3) {
        if (cups.indexOf(currentCup) + 1 >= cups.length) {
          pickedUp.push(cups.shift() as number);
        } else {
          pickedUp.push(...cups.splice(cups.indexOf(currentCup) + 1, 1));
        }
      }

      let destinationCup = cups[cups.indexOf(currentCup)] - 1;

      if (destinationCup < 1) destinationCup = 9;
      let destinationCupIndex = cups.indexOf(destinationCup);

      while (destinationCupIndex < 0) {
        destinationCup--;
        if (destinationCup < 1) destinationCup = 9;
        destinationCupIndex = cups.indexOf(destinationCup);
      }

      cups.splice(destinationCupIndex + 1, 0, ...pickedUp);
      currentCup = cups[(cups.indexOf(currentCup) + 1) % cups.length];
    }
    const result: number[] = [];
    for (let i = 0; i < cups.length; i++) {
      result.push(
        i + cups.indexOf(1) < cups.length
          ? cups[i + cups.indexOf(1)]
          : cups[cups.length - i - 1]
      );
    }
    result.shift();
    console.log(result);
  };

  await part1(100);
};

await day23();
