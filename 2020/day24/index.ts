const day24 = async () => {
  const part1 = async () => {
    const directions = (await Deno.readTextFile('./input.txt'))
      .split('\n')
      .map((x) => x.match(/e|se|sw|w|nw|ne/g)?.toString() as string);

    const blackTiles: string[] = [];
    directions.forEach((directionRow) => {
      let x = 0;
      let y = 0;
      directionRow.split(',').forEach((direction) => {
        switch (direction) {
          case 'e': {
            x += 1;
            break;
          }
          case 'se': {
            y += 1;
            break;
          }
          case 'sw': {
            x -= 1;
            y += 1;
            break;
          }
          case 'w': {
            x -= 1;
            break;
          }
          case 'nw': {
            y -= 1;
            break;
          }
          case 'ne': {
            x += 1;
            y -= 1;
            break;
          }
          default: {
            throw Error(`Direction not found, ${direction}`);
          }
        }
      });

      const key = `${x},${y}`;
      const blackTileIndex = blackTiles.indexOf(key);
      if (blackTileIndex != -1) blackTiles.splice(blackTileIndex, 1);
      else blackTiles.push(key);
    });

    console.log(blackTiles.length);
  };

  await part1();
};

await day24();
