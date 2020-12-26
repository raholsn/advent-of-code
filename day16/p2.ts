export const day16P2 = async () => {
  const parseRules = (
    rawRules: string
  ): Record<string, (ticket: number) => boolean> => {
    const rules: Record<string, (ticket: number) => boolean> = {};

    rawRules.split('\n').forEach((row) => {
      const key = row.split(': ')[0];
      const [range1, range2] = row.split(': ')[1].split(' or ');
      const [min1, max1] = range1.split('-').map(Number);
      const [min2, max2] = range2.split('-').map(Number);
      rules[key] = (ticket: number) =>
        (+ticket >= min1 && +ticket <= max1) ||
        (+ticket >= min2 && +ticket <= max2);
    });

    return rules;
  };

  const parseNearbyTickets = (rawNearbyTickets: string) =>
    rawNearbyTickets
      .split('\n')
      .map((x) => x.split(','))
      .slice(1);

  const parseMyTickets = (rawMyTickets: string): number[] =>
    rawMyTickets.split('\n')[1].split(',').map(Number);

  const getValidTickets = (
    tickets: string[][],
    rules: Record<string, (ticket: number) => boolean>
  ) =>
    tickets.filter(
      (ticket) =>
        !ticket.some((ticket) =>
          Object.values(rules).every((rule) => rule(+ticket) === false)
        )
    );

  const transformToColumn = (validTickets: string[][]) => {
    const columns = Array(validTickets[0].length)
      .fill('')
      .map(() => []) as string[][];

    validTickets.forEach((_, vIndex) =>
      columns.forEach(
        (_, gIndex) => (columns[gIndex][vIndex] = validTickets[vIndex][gIndex])
      )
    );
    return columns;
  };

  const applyRules = (
    columns: string[][],
    rules: Record<string, (ticket: number) => boolean>
  ) => {
    const columnSets: Set<string>[] = [];
    columns.forEach((column, index) => {
      const set = new Set<string>();
      for (const key in rules) {
        const isValid = column.every((val) => rules[key](+val));
        if (isValid) set.add(key);
      }
      columnSets[index] = set;
    });
    return columnSets;
  };

  const calculateDeparture = (
    columns: string[][],
    resultSet: Set<string>[],
    myTickets: number[]
  ) => {
    let i = 0;
    let sum = 1;
    while (i < columns.length) {
      resultSet.forEach((s, index) => {
        if (s.size === 1) {
          const key = [...s][0];
          for (const set of resultSet) set.delete(key);
          if (key.includes('departure')) {
            sum *= myTickets[index];
          }
          i++;
        }
      });
    }

    return sum;
  };

  const part2 = async () => {
    const [rawRules, rawMyTickets, rawNearbyTickets] = (
      await Deno.readTextFile('./input.txt')
    ).split('\n\n');

    const rules = parseRules(rawRules);
    const nearbyTickets = parseNearbyTickets(rawNearbyTickets);
    const myTicket = parseMyTickets(rawMyTickets);
    const validTickets = getValidTickets(nearbyTickets, rules);
    const columns = transformToColumn(validTickets);
    const resultSet = applyRules(columns, rules);
    return calculateDeparture(columns, resultSet, myTicket);
  };

  console.log(await part2());
};
