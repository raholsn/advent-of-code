const day20 = async () => {
  interface tile {
    title: number;
    boarder: string[];
    match: { count: number; title: number[] };
  }

  const getBoarders = (imageRows: string[]): string[] => {
    const boarders = [];
    const top = imageRows[0];
    const bottom = imageRows[imageRows.length - 1];
    const left = imageRows.map((x) => x[0]).join('');
    const right = imageRows.map((x) => x[x.length - 1]).join('');

    boarders.push(top);
    boarders.push(bottom);
    boarders.push(left);
    boarders.push(right);

    return boarders.concat(
      boarders.map((boarder) => boarder.split('').reverse().join(''))
    );
  };
  const parseTiles = (unParsedTiles: string[]): tile[] => {
    const tiles: tile[] = [];

    unParsedTiles.forEach((unParsedTile) => {
      const [title, image] = unParsedTile.split(':');

      const imageRows = image.split('\n');
      imageRows.shift();

      tiles.push({
        title: +title.split(' ')[1],
        boarder: getBoarders(imageRows),
        match: { count: 0, title: [] },
      });
    });

    return tiles;
  };

  const matchTiles = (tiles: tile[]) => {
    tiles.forEach((tile) => {
      tiles.forEach((tile2) => {
        if (tile.title !== tile2.title) {
          if (tile.boarder.some((x) => tile2.boarder.includes(x))) {
            tile.match.count++;
            tile.match.title.push(tile2.title);
            tile2.match.count++;
            tile2.match.title.push(tile.title);
          }
        }
      });
    });

    return tiles;
  };

  const part1 = async () => {
    const unParsedTiles = (await Deno.readTextFile('./input.txt')).split(
      '\n\n'
    );

    const tiles = parseTiles(unParsedTiles);
    const matches = matchTiles(tiles);
    const corners = matches
      .filter((x) => x.match.count === 4)
      .map((x) => x.title);
    const result = corners.reduce((prev, curr) => prev * curr, 1);
    console.log(result);
  };

  await part1();
};

await day20();
