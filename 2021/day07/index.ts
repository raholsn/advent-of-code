const day6 = async () => {
  const input = (await Deno.readTextFile('./input.txt'))
    .split(',')
    .map((x) => parseInt(x));

  const assignment1 = () => {
    const arr = Array.from(Array(input.length).keys());
    const map = new Map<number, number>();
    for (let i = 1; i < arr.length; i++) {
      let res = 0;
      for (let j = 0; j < input.length; j++) {
        res += Math.abs(input[j] - i);
      }
      map.set(i, res);
    }

    const minValue = Math.min(...Array.from(map.values()));
    console.log(minValue);
  };

  const assignment2 = () => {
    const map = new Map<number, number>();
    for (let i = 1; i < 1000; i++) {
      let res = 0;
      for (let j = 0; j < input.length; j++) {
        const n = Math.abs(input[j] - i);
        res += (n * (n + 1)) / 2;
      }
      map.set(i, res);
    }

    const minValue = Math.min(...Array.from(map.values()));
    console.log(minValue);
  };

  assignment1();
  assignment2();
};

await day6();
