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

  const generateMaskAddresses = (address: string, mask: string): string => {
    let maskedBinary = "";
    for (let index = 0; index < address.length; index++) {
      if (mask[index] === "X") maskedBinary += "X";
      else if (mask[index] === "1" || address[index] === "1")
        maskedBinary += "1";
      else maskedBinary += "0";
    }
    return maskedBinary;
  };

  const decodeMemoryAddresses = (
    address: string[],
    addresses: string[],
    startIndex: number
  ) => {
    for (let i = startIndex; i < address.length; i++) {
      if (address[i] === "X") {
        const otheraddress = [...address];
        otheraddress[i] = "1";
        if (!otheraddress.includes("X")) addresses.push(otheraddress.join(""));
        else decodeMemoryAddresses(otheraddress, addresses, i);
        const otheraddress2 = [...address];
        otheraddress2[i] = "0";
        if (!otheraddress2.includes("X"))
          addresses.push(otheraddress2.join(""));
        else decodeMemoryAddresses(otheraddress2, addresses, i);
      }
    }
  };

  const part2 = async () => {
    const input = (await Deno.readTextFile("./input.txt")).split("\n");
    let mask: string;
    const maskedValues: Map<number, number> = new Map();
    input.forEach((line) => {
      if (isMem(line)) {
        const { address, value } = parseMem(line);

        const newMasks = generateMaskAddresses(
          (+address).toString(2).padStart(36, "0"),
          mask
        );
        const addresses: string[] = [];
        decodeMemoryAddresses([...newMasks], addresses, 0);

        for (let i = 0; i < addresses.length; i++) {
          const address = parseInt(addresses[i], 2);
          maskedValues.set(address, parseInt(value, 2));
        }
      }

      if (isMask(line)) mask = parseMask(line);
    });

    return [...maskedValues.values()].reduce((prev, curr) => prev + curr);
  };

  console.log(await part1());
  console.log(await part2());
};

await day14();
