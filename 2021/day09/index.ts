const day9 = async () => {
  const input = (await Deno.readTextFile('./input.txt'))
    .split('\n')
    .map((x) => x.split('').map((x) => parseInt(x)));

  function calcLowPoints() {
    const lowPoints = new Map<string, number>();
    const rows = input.length;
    const cols = input[0].length;

    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        const val = input[y][x];

        const up = y - 1 >= 0 ? input[y - 1][x] > val : true;
        const down = y + 1 >= rows ? true : input[y + 1][x] > val;
        const right = x + 1 >= cols ? true : input[y][x + 1] > val;
        const left = x - 1 >= 0 ? input[y][x - 1] > val : true;

        if (up && down && right && left) {
          lowPoints.set(`${x}:${y}`, val);
        }
      }
    }

    return lowPoints;
  }
  const assignment1 = () => {
    const lowPoints = calcLowPoints();
    console.log(Array.from(lowPoints.values()).reduce((x, y) => x + 1 + y) + 1);
  };

  const floodFill = (
    image: number[][],
    sr: number,
    sc: number,
    newColor: number
  ): number => {
    return fill(image, sr, sc, newColor, image[sr][sc], 0);
  };

  const fill = (
    image: number[][],
    sr: number,
    sc: number,
    newColor: number,
    current: number,
    size: number
  ): number => {
    if (sr < 0) return 0;
    if (sc < 0) return 0;
    if (sr > image.length - 1) return 0;
    if (sc > image[sr].length - 1) return 0;
    if (image[sr][sc] !== current) return 0;

    image[sr][sc] = newColor;
    size = 1;

    size += fill(image, sr - 1, sc, newColor, current, size);
    size += fill(image, sr + 1, sc, newColor, current, size);
    size += fill(image, sr, sc - 1, newColor, current, size);
    size += fill(image, sr, sc + 1, newColor, current, size);

    return size;
  };

  function calcBasins(lowPoints: Map<string, number>) {
    const keys = Array.from(lowPoints.keys()).map((key) => {
      const [x, y] = key.split(':');
      return {
        x: parseInt(x),
        y: parseInt(y),
      };
    });

    const newInput = input.map((x) => x.map((y) => (y === 9 ? 9 : 0)));
    const basinMap = new Map<string, number>();
    for (const key of keys) {
      const size = floodFill(newInput, key.y, key.x, 1);
      basinMap.set(`${key.y}:${key.x}`, size);
    }

    return basinMap;
  }

  const assignment2 = () => {
    const lowPoints = calcLowPoints();
    const basins = calcBasins(lowPoints);
    const answer = [...basins.values()]
      .sort((a: number, b: number) => b - a)
      .slice(0, 3)
      .reduce((x, y) => x * y);

    console.log(answer);
  };

  assignment1();
  assignment2();
};

await day9();
