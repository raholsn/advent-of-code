const day18 = async () => {
  const calculate = (expression: string): number => {
    const calc = expression.split(' ');
    let i = 0;
    let sum = 0;
    while (i < calc.length) {
      if (calc[i] === '*') {
        if (sum === 0) {
          sum++;
        }
        sum = +calc[i - 1] * +calc[i + 1];
        calc[i + 1] = sum.toString();
      } else if (calc[i] === '+') {
        sum = +calc[i - 1] + +calc[i + 1];
        calc[i + 1] = sum.toString();
      }

      i++;
    }
    return sum;
  };

  const calculatePlusFirst = (expression: string): number => {
    const calc = expression.split(' ');
    let i = 0;
    let sum = 0;
    while (i < calc.length) {
      if (calc[i] === '+') {
        sum = +calc[i - 1] + +calc[i + 1];
        calc[i + 1] = sum.toString();
        calc.splice(i - 1, 2);
        i = 0;
      }
      i++;
    }
    if (calc.length > 1) sum = calculate(calc.join(' '));

    return sum;
  };

  const part1 = async () => {
    const numbers = (await Deno.readTextFile('./input.txt')).split('\n');
    let sum = 0;
    numbers.forEach((line) => {
      let expression = line;
      while (
        expression.includes('(') ||
        expression.includes('+') ||
        expression.includes('*')
      ) {
        const pc = /\(([^()]*)\)/.exec(expression);
        if (pc != null) {
          const result = calculate(pc[1]);
          expression = expression.replace(pc[0], result.toString());
        } else {
          const result = calculate(expression);
          expression = expression.replace(expression, result.toString());
        }
      }
      sum += +expression;
    });
    return sum;
  };

  const part2 = async () => {
    const numbers = (await Deno.readTextFile('./input.txt')).split('\n');
    let sum = 0;
    numbers.forEach((line) => {
      let expression = line;
      while (
        expression.includes('(') ||
        expression.includes('+') ||
        expression.includes('*')
      ) {
        const pc = /\(([^()]*)\)/.exec(expression);
        if (pc != null) {
          const result = calculatePlusFirst(pc[1]);
          expression = expression.replace(pc[0], result.toString());
        } else {
          const result = calculatePlusFirst(expression);
          expression = expression.replace(expression, result.toString());
        }
      }
      sum += +expression;
    });

    return sum;
  };

  console.log(await part1());
  console.log(await part2());
};

await day18();
