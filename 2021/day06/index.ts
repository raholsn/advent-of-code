const day6 = async () => {
  const input = (await Deno.readTextFile('./input.txt'))
    .split(',')
    .map((x) => parseInt(x)) as number[];

  const assignment1 = () => {
    let days = 0;
    const fish = [...input];
    let newFishs: number[] = [];
    while (days !== 80) {
      for (let i = 0; i < fish.length; i++) {
        let count = fish[i];
        count--;

        if (count < 0) {
          newFishs.push(8);
          count = 6;
        }

        fish[i] = count;
      }

      days++;
      newFishs.forEach((x) => fish.push(x));
      newFishs = [];
    }

    console.log(fish.length);
  };

  const assignment2 = () => {
    const fish = Array(9).fill(0);
    input.forEach((x) => fish[x]++);
    for (let days = 0; days < 256; days++) {
      let fish6 = 0;
      let fish8 = 0;
      for (let day = 0; day <= fish.length; day++) {
        let fishDay = fish[day];
        if (day == 0) {
          fish6 = fishDay;
          fish8 = fishDay;
        } else {
          fish[day - 1] = fishDay;
        }
      }
      fish[6] += fish6;
      fish[8] = fish8;
    }
    console.log(fish.reduce((x, y) => x + y));
  };

  assignment1();
  assignment2();
};

await day6();
