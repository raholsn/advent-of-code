const day1 = async () => {
  const measurements = (await Deno.readTextFile('./input.txt'))
    .split('\n')
    .map((x) => +x);

  const assignment1 = () => {
    let answer = 0;
    for (let i = 1; i < measurements.length; i++) {
      const previous = measurements[i - 1];
      const current = measurements[i];

      if (current > previous) {
        answer++;
      }
    }

    console.log(answer);
  };

  const assignment2 = () => {
    let answer = 0;
    while (measurements.length >= 3) {
      const previous = measurements.slice(0, 3).reduce((a, b) => a + b);
      const current = measurements.slice(1, 4).reduce((a, b) => a + b);
      measurements.shift();
      if (current > previous) answer++;
    }

    console.log(answer);
  };

  assignment1();
  assignment2();
};

await day1();
