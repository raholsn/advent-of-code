const day14 = async () => {
  const isMask = (line: string) => line.includes("mask");
  const parseMask = (line: string) => line.split("= ")[1];
  const isMem = (line: string) => line.includes("mem");
  const parseMem = (line: string): { address: number; value: string } => {
    const address = /\d+/.exec(line) as RegExpExecArray;
    const value = line.split("= ")[1];

    return {
      address: +address[0],
      value: (+value).toString(2).padStart(36, "0"),
    };
  };

  const maskValue = (value: string, mask: string): number => {
    let maskedBinary = "";
    for (let index = 0; index < value.length; index++) {
      if (mask[index] === "X") maskedBinary += value[index];
      else maskedBinary += mask[index];
    }
    return parseInt(maskedBinary, 2);
  };

  const part1 = async () => {
    const input = (await Deno.readTextFile("./input.txt")).split("\n");
    let mask: string;
    const maskedValues: number[] = [];
    input.forEach((line) => {
      if (isMem(line)) {
        const { address, value } = parseMem(line);
        maskedValues[address] = maskValue(value, mask as string);
      }

      if (isMask(line)) mask = parseMask(line);
    });

    return maskedValues.reduce((prev, curr) => curr + prev);
  };

  console.log(await part1());
};

await day14();
