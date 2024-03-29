const day2 = async () => {
  const operations = (await Deno.readTextFile('./input.txt'))
    .split('\n')
    .map((x) => ({
      type: x.split(' ')[0],
      value: parseInt(x.split(' ')[1]),
    }));

  const assignment1 = () => {
    let depth = 0;
    let horizontal = 0;
    for (let i = 0; i < operations.length; i++) {
      switch (operations[i].type) {
        case 'forward':
          horizontal += operations[i].value;
          break;
        case 'up':
          depth -= operations[i].value;
          break;
        case 'down':
          depth += operations[i].value;
          break;
      }
    }

    const answer = depth * horizontal;

    console.log(answer);
  };

  const assignment2 = () => {
    let depth = 0;
    let horizontal = 0;
    let aim = 0;
    for (let i = 0; i < operations.length; i++) {
      switch (operations[i].type) {
        case 'forward':
          horizontal += operations[i].value;
          if (aim !== 0) depth += operations[i].value * aim;
          break;
        case 'up':
          aim -= operations[i].value;
          break;
        case 'down':
          aim += operations[i].value;
          break;
      }
    }

    const answer = depth * horizontal;

    console.log(answer);
  };

  assignment1();
  assignment2();
};

await day2();
