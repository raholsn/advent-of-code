const day8 = async () => {
  type Opeartion = "nop" | "acc" | "jmp";

  interface Instruction {
    type: Opeartion;
    count: number;
    executed: boolean;
  }

  const input = (await Deno.readTextFile("./input.txt")).split("\n");

  const mapInstructions = (input: string[]): Instruction[] =>
    input.map((line) => ({
      type: line.split(" ")[0] as Opeartion,
      count: +line.split(" ")[1],
      executed: false,
    }));

  const part1 = () => {
    const instructions = mapInstructions(input);

    let accumulator = 0;
    let index = 0;
    while (instructions.length > index) {
      const instruction = instructions[index];

      if (instruction.executed) break;
      instruction.executed = true;

      switch (instruction.type) {
        case "acc":
          index++;
          accumulator += instruction.count;
          break;
        case "jmp":
          index += instruction.count;
          break;
        case "nop":
          index++;
          break;
      }
    }

    console.log(accumulator);
  };

  const part2 = () => {
    const instructions = mapInstructions(input);
    for (let i = 0; i < instructions.length - 1; i++) {
      const instructionsCopy = JSON.parse(JSON.stringify(instructions));
      if (instructionsCopy[i].type === "jmp") {
        instructionsCopy[i].type = "nop";
      } else if (instructionsCopy[i].type === "nop")
        instructionsCopy[i].type = "jmp";
      else continue;

      let accumulator = 0;
      let index = 0;
      while (instructionsCopy.length - 1 > index) {
        if (instructionsCopy[index].executed) break;
        instructionsCopy[index].executed = true;
        switch (instructionsCopy[index].type) {
          case "acc":
            index += 1;
            accumulator += instructionsCopy[index].count;
            break;
          case "jmp":
            index += instructionsCopy[index].count;
            break;
          case "nop":
            index++;
            break;
        }

        if (instructionsCopy.length === index) {
          console.log(accumulator);
        }
      }
    }
  };
  part1();
  //not finished
  // part2();
};

await day8();
