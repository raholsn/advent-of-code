const day3 = async () => {
  const bits = (await Deno.readTextFile('./input.txt'))
    .split('\n')
    .map((x) => x.split(''));

  const assignment1 = () => {
    const cols = bits[0].length;
    const rows = bits.length;

    let gammaBit = '';
    let epsilonBit = '';
    for (let x = 0; x < cols; x++) {
      let bitCount = 0;
      for (let y = 0; y < rows; y++) {
        bitCount += +bits[y][x];
      }
      gammaBit += bitCount > rows / 2 ? '1' : '0';
      epsilonBit += bitCount > rows / 2 ? '0' : '1';
    }

    console.log(parseInt(gammaBit, 2) * parseInt(epsilonBit, 2));
  };

  function calcAssignment2(bits: string[][], isCo2: boolean) {
    let position = 0;
    while (bits.length > 1) {
      let bitCount = 0;
      for (let x = 0; x < bits.length; x++) {
        bitCount += +bits[x][position];
      }

      const bit = isCo2 ? (bitCount >= bits.length / 2 ? '0' : '1') : (bitCount >= bits.length / 2 ? '1' : '0');

      for (let x = 0; x < bits.length; x++) {
        if (+bits[x][position] !== +bit) {
          bits[x] = [];
        }
      }
      bits = bits.filter((x) => x.length !== 0);
      position++;
    }

    return bits[0].join('');
  }

  const assignment2 = () => {
    const oxygenRating = calcAssignment2([...bits], false);
    const co2Rating = calcAssignment2([...bits], true);
    console.log(parseInt(oxygenRating, 2) * parseInt(co2Rating, 2));
  };

  assignment1();
  assignment2();
};

await day3();
