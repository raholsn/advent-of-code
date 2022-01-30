const day10 = async () => {
  const input = (await Deno.readTextFile('./input.txt')).split('\n');

  const assignment1 = () => {
    const queue = [];

    let points = 0;
    for (let i = 0; i < input.length; i++) {
      for (let j = 0; j < input[i].length; j++) {
        const current = input[i][j];
        if (
          current === '(' ||
          current === '[' ||
          current === '{' ||
          current === '<'
        ) {
          queue.push(current);
        } else if (current === ')') {
          if (queue.pop() !== '(') points += 3;
        } else if (current === ']') {
          if (queue.pop() !== '[') points += 57;
        } else if (current === '}') {
          if (queue.pop() !== '{') points += 1197;
        } else {
          if (queue.pop() !== '<') {
            points += 25137;
          }
        }
      }
    }

    console.log(points);
  };

  function getMedian(numbers: number[]): number {
    const sorted = numbers.slice().sort((a, b) => a - b);
    const middle = Math.floor(sorted.length / 2);

    if (sorted.length % 2 === 0) {
      return (sorted[middle - 1] + sorted[middle]) / 2;
    }

    return sorted[middle];
  }

  const assignment2 = () => {
    const inCompleted: string[][] = [];
    for (let i = 0; i < input.length; i++) {
      const stack: string[] = [];
      let corrupted = false;
      for (let j = 0; j < input[i].length; j++) {
        const current = input[i][j];
        if (current === '(') {
          stack.push(')');
        } else if (current === '[') {
          stack.push(']');
        } else if (current === '{') {
          stack.push('}');
        } else if (current === '<') {
          stack.push('>');
        } else {
          if (current !== stack.pop()) {
            corrupted = true;
            break;
          }
        }
      }

      if (!corrupted && stack.length > 0) inCompleted.push(stack);
    }

    const inCompletedReversed = inCompleted.map((x) => x.reverse());
    const total = [];
    for (const line of inCompletedReversed) {
      let score = 0;
      for (let i = 0; i < line.length; i++) {
        score *= 5;
        switch (line[i]) {
          case ')':
            score += 1;
            break;
          case ']':
            score += 2;
            break;
          case '}':
            score += 3;
            break;
          case '>':
            score += 4;
            break;
        }
      }
      total.push(score);
    }
    console.log(getMedian(total));
  };

  assignment1();
  assignment2();
};

await day10();
