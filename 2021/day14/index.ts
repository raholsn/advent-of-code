const day14 = async () => {
  const [polymer, pairs] = (await Deno.readTextFile('./input.txt')).split(
    '\n\n'
  );

  const calc = (steps: number) => {
    const pairMap: Map<string, string[]> = new Map();
    pairs
      .split('\n')
      .map((x) => x.split(' -> '))
      .forEach(([input, output]) => {
        pairMap.set(input, [input[0] + output, output + input[1]]);
      });

    const totalCharCount: Map<string, number> = new Map([
      [polymer[polymer.length - 1], 1], //last char
    ]);

    let currentPairCount: Map<string, number> = new Map();

    for (let i = 0; i < polymer.length - 1; i++) {
      const key = polymer[i] + polymer[i + 1];
      if (!currentPairCount.has(key)) currentPairCount.set(key, 0);
      currentPairCount.set(key, currentPairCount.get(key)! + 1);
    }

    for (let step = 0; step < steps; step++) {
      const nextPairCount = new Map();
      for (const [key, value] of currentPairCount.entries()) {
        const [first, second] = pairMap.get(key)!;
        if (!nextPairCount.has(first)) nextPairCount.set(first, 0);
        if (!nextPairCount.has(second)) nextPairCount.set(second, 0);
        nextPairCount.set(first, nextPairCount.get(first) + value);
        nextPairCount.set(second, nextPairCount.get(second) + value);
      }
      currentPairCount = nextPairCount;
    }

    for (const [key, value] of currentPairCount.entries()) {
      if (!totalCharCount.has(key[0])) totalCharCount.set(key[0], 0);
      totalCharCount.set(key[0], totalCharCount.get(key[0])! + value);
    }

    const mostCommon = Math.max(...totalCharCount.values());
    const lessCommon = Math.min(...totalCharCount.values());
    console.log(mostCommon - lessCommon);
  };

  const assignment1 = () => calc(10);
  const assignment2 = () => calc(40);

  assignment1();
  assignment2();
};

await day14();
