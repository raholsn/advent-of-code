const day8 = async () => {
  const assignment1 = async () => {
    const letters = (await Deno.readTextFile('./input.txt'))
      .split('\n')
      .map((x) => x.split('|')[1].trim())
      .join(' ')
      .split(' ');

    let count = 0;
    for (let i = 0; i < letters.length; i++) {
      if ([2, 4, 3, 7].includes(letters[i].length)) count++;
    }
    console.log(count);
  };

  const isSubstring = (a: string | undefined, b: string | undefined) =>
    b!.split('').every((x) => a!.includes(x));

  const assignment2 = async () => {
    const lines = (await Deno.readTextFile('./input.txt'))
      .split('\n')
      .map((line) => {
        const before = line
          .split(' | ')[0]
          .split(' ')
          .map((a) => [...a].sort().join());
        const after = line
          .split(' | ')[1]
          .split(' ')
          .map((a) => [...a].sort().join());
        return {
          before: before.map((x) => x.replaceAll(',', '')),
          after: after.map((x) => x.replaceAll(',', '')),
        };
      });

    let count = 0;
    for (let i = 0; i < lines.length; i++) {
      const one = lines[i].before.find((x) => {
        return x.length === 2;
      });
      const four = lines[i].before.find((x) => x.length === 4);
      const seven = lines[i].before.find((x) => x.length === 3);
      const eight = lines[i].before.find((x) => x.length === 7);
      const six = lines[i].before.find(
        (x) => x.length === 6 && !isSubstring(x, one)
      );
      const three = lines[i].before.find(
        (x) => x.length === 5 && isSubstring(x, one)
      );
      const nine = lines[i].before.find(
        (x) => x.length === 6 && isSubstring(x, four) && x !== six
      );
      const zero = lines[i].before.find(
        (x) => x.length === 6 && x !== six && x !== nine
      );
      const five = lines[i].before.find(
        (x) => x.length === 5 && isSubstring(six, x) && x !== three
      );
      const two = lines[i].before.find(
        (x) => x.length === 5 && x !== three && x !== five
      );

      let digit = '';
      for (const after of lines[i].after) {
        switch (after) {
          case zero:
            digit += '0';
            break;
          case one:
            digit += '1';
            break;
          case two:
            digit += '2';
            break;
          case three:
            digit += '3';
            break;
          case four:
            digit += '4';
            break;
          case five:
            digit += '5';
            break;
          case six:
            digit += '6';
            break;
          case seven:
            digit += '7';
            break;
          case eight:
            digit += '8';
            break;
          case nine:
            digit += '9';
            break;
        }
      }

      count += parseInt(digit);
    }
    console.log(count);
  };

  await assignment1();
  await assignment2();
};

await day8();
