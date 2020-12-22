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

  console.log(await part1());
};

await day13();
