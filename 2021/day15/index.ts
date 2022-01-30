const day15 = async () => {
  const input = (await Deno.readTextFile('./input.txt'))
    .split('\n')
    .map((x) => x.split('').map(Number));

  interface Vertex {
    x: number;
    y: number;
    distance: number;
    previousVertices: Vertex | undefined;
    shortedDistanceFromStart: number;
  }

  const calc = (
    map: number[][],
    vertexes: Map<string, Vertex>,
    unvisited: Map<string, Vertex>
  ) => {
    function findShortestDistanceFromStart(
      unvisited: Map<string, Vertex>
    ): [string, Vertex] {
      return Array.from(unvisited).sort(
        ([, a], [, b]) =>
          a.shortedDistanceFromStart - b.shortedDistanceFromStart
      )[0];
    }

    function getAdjacentVertex(y: number, x: number) {
      const vertex = vertexes.get(`${y}:${x}`);
      return { key: `${y}:${x}`, vertex };
    }

    while (Array.from(unvisited).length > 0) {
      //find unvisited vertex with shortest distance from start
      const currentVertex = findShortestDistanceFromStart(unvisited);

      //remove from unvisited
      const [currentVertexKey, currentVertexValue] = currentVertex;

      console.log(`${currentVertexKey}/${map.length - 1}:${map[0].length - 1}`);

      const vertexRight = getAdjacentVertex(
        currentVertexValue.y,
        currentVertexValue.x + 1
      ); //right
      const vertexDown = getAdjacentVertex(
        currentVertexValue.y + 1,
        currentVertexValue.x
      ); //down

      //get shortest path from current vertex to each neighbor
      for (const adjacentVertex of [vertexDown, vertexRight].filter(
        (x) => x.vertex !== undefined
      )) {
        if (adjacentVertex.vertex!.shortedDistanceFromStart === Infinity) {
          adjacentVertex!.vertex!.shortedDistanceFromStart =
            currentVertexValue.shortedDistanceFromStart +
            adjacentVertex.vertex!.distance;
        } else {
          adjacentVertex!.vertex!.shortedDistanceFromStart = Math.min(
            currentVertexValue.shortedDistanceFromStart +
              adjacentVertex.vertex!.distance,
            adjacentVertex!.vertex!.previousVertices!.shortedDistanceFromStart +
              adjacentVertex.vertex!.distance
          );
        }

        //update previous vertex
        adjacentVertex.vertex!.previousVertices = currentVertexValue!;

        //update vertexes
        vertexes.delete(adjacentVertex.key);
        vertexes.set(adjacentVertex.key, adjacentVertex.vertex!);
      }

      //remove from unvisited
      unvisited.delete(currentVertexKey);
    }

    console.log(
      'final vertexes',
      vertexes.get(`${map.length - 1}:${map[0].length - 1}`)
    );
  };

  const assignment1 = () => {
    const vertexes: Map<string, Vertex> = new Map();

    for (let y = 0; y < input.length; y++) {
      for (let x = 0; x < input[y].length; x++) {
        vertexes.set(`${y}:${x}`, {
          x,
          y,
          distance: x == 0 && y == 0 ? 0 : input[y][x],
          previousVertices: undefined,
          shortedDistanceFromStart: x == 0 && y == 0 ? 0 : Infinity,
        });
      }
    }

    //unvisited
    const unvisited: Map<string, Vertex> = new Map([...vertexes]);

    calc(input, vertexes, unvisited);
  };

  const assignment2 = () => {
    const newMap = Array(5 * input.length)
      .fill(0)
      .map((_, y) =>
        Array(5 * input.length)
          .fill(0)
          .map((_, x) => {
            const originalX = x % input.length;
            const originalY = y % input.length;
            const offset =
              Math.floor(x / input.length) + Math.floor(y / input.length);
            const value = input[originalY][originalX] + offset;
            return value > 9 ? value - 9 : value;
          })
      );

    const vertexes: Map<string, Vertex> = new Map();

    for (let y = 0; y < input.length; y++) {
      for (let x = 0; x < input[y].length; x++) {
        vertexes.set(`${y}:${x}`, {
          x,
          y,
          distance: x == 0 && y == 0 ? 0 : input[y][x],
          previousVertices: undefined,
          shortedDistanceFromStart: x == 0 && y == 0 ? 0 : Infinity,
        });
      }
    }

    //unvisited
    const unvisited: Map<string, Vertex> = new Map([...vertexes]);

    calc(newMap, vertexes, unvisited);
  };

  assignment1();

  //this works but runs slow.. need to implement priority queue to dijkstra
  // assignment2();
};

await day15();
