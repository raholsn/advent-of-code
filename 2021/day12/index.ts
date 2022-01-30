const day12 = async () => {
  const input = (await Deno.readTextFile('./input.txt'))
    .split('\n')
    .map((x) => x.split('-'));

  function createGraph() {
    const graph = new Map<string, string[]>();
    for (const line of input) {
      if (graph.has(line[0])) {
        const existing = graph.get(line[0])!;
        existing.push(line[1]);
        graph.set(line[0], existing);
      } else {
        graph.set(line[0], [line[1]]);
      }

      if (graph.has(line[1])) {
        const existing = graph.get(line[1])!;
        existing.push(line[0]);
        graph.set(line[1], existing);
      } else {
        graph.set(line[1], [line[0]]);
      }
    }

    return graph;
  }

  function findAllPathsA1(
    graph: Map<string, string[]>,
    paths: string[][],
    current: string[][]
  ) {
    while (current.length > 0) {
      const lastPath = current.pop()!;
      const newCurrent = lastPath.at(-1)!;

      if (newCurrent == 'end') {
        paths.push(lastPath);
        continue;
      }

      const newPath = [...graph.get(newCurrent)!];

      newPath.forEach((c) => {
        if ((lastPath.includes(c) && !(c.toUpperCase() == c)) || c == 'start')
          return;

        current.push(lastPath.concat(c));
      });
    }

    return paths;
  }

  function findAllPathsA2(
    graph: Map<string, string[]>,
    paths: string[][],
    current: string[][]
  ) {
    while (current.length > 0) {
      const lastPath = current.pop()!;
      const newCurrent = lastPath.at(-1)!;

      if (newCurrent == 'end') {
        paths.push(lastPath);
        continue;
      }

      const newPath = [...graph.get(newCurrent)!];

      newPath.forEach((c) => {
        if (c == 'start') return;
        const path = lastPath.concat(c);

        let occurrences = 0;

        const count = new Map<string, number>();

        for (const p of path) {
          if (p.toUpperCase() === p) continue;
          if (count.has(p)) occurrences++;
          count.set(p, 0);
        }

        if (occurrences < 2) current.push(path);
      });
    }

    return paths;
  }

  const assignment1 = () => {
    const graph = createGraph();
    const paths = findAllPathsA1(graph, [[]], [['start']])!;
    console.log(paths.length);
  };

  const assignment2 = () => {
    const graph = createGraph();
    const paths = findAllPathsA2(graph, [[]], [['start']])!;
    console.log(paths.length - 1);
  };

  assignment1();
  assignment2();
};

await day12();
