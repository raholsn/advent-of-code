const day25 = async () => {
  const [doorKey, cardKey] = (await Deno.readTextFile('./input.txt'))
    .split('\n')
    .map((x) => +x);

  const expmod = (base: number, exp: number, mod: number): number => {
    if (exp == 0) return 1;
    if (exp % 2 == 0) return Math.pow(expmod(base, exp / 2, mod), 2) % mod;
    else return (base * expmod(base, exp - 1, mod)) % mod;
  };

  let loopSize = 0;
  let loopSize2 = 0;

  while (expmod(7, loopSize, 20201227) != doorKey) loopSize++;
  while (expmod(7, loopSize2, 20201227) != cardKey) loopSize2++;

  const encryption = expmod(doorKey, loopSize2, 20201227);

  console.log(encryption);
};

await day25();
