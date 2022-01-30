const day13 = async () => {
  const part1 = async () => {
    const input = (await Deno.readTextFile("./input.txt")).split("\n");

    const myArrivalTime = +input[0];
    const buses = input[1]
      ?.split(",")
      .filter((x) => x !== "x")
      .map((x) => +x);

    let waitingTime = myArrivalTime;
    let myBusId = undefined;
    while (true) {
      waitingTime++;
      const busId = buses.find((bus) => waitingTime % bus === 0);

      if (busId != undefined) {
        myBusId = busId;
        break;
      }
    }

    return (waitingTime - myArrivalTime) * myBusId;
  };

  const part2 = async () => {
    const input = (await Deno.readTextFile("./input.txt")).split("\n");
    const buses = input[1]
      .replace(/x/g, "1")
      .split(",")
      .map((x) => +x);

    let time = 0;
    let multiplier = buses[0];
    let i = 1;
    while (i < buses.length) {
      while ((time + i) % buses[i] !== 0) time += multiplier;
      multiplier *= buses[i];
      i++;
    }
    return time;
  };

  console.log(await part1());
  console.log(await part2());
};

await day13();
