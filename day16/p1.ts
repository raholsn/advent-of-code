export const day16P1 = async () => {
  const parseRules = (rawRules: string) =>
    rawRules
      .split('\n')
      .map((row) => row.split(': ')[1].split(' or '))
      .flat();

  const parseNearbyTickets = (rawNearbyTickets: string) =>
    rawNearbyTickets
      .split('\n')
      .map((x) => x.split(','))
      .flat()
      .slice(1);

  const invalidNearbyTickets = (rules: string[], nearbyTickets: string[]) => {
    let invalid = 0;
    nearbyTickets.forEach((ticket) => {
      const isInvalid = rules.every((range) => {
        const [min, max] = range.split('-');
        if (+ticket < +min || +ticket > +max) {
          return true;
        }
        return false;
      });

      if (isInvalid) {
        invalid += +ticket;
      }
    });

    return invalid;
  };

  const part1 = async () => {
    const [rawRules, rawYouTickets, rawNearbyTickets] = (
      await Deno.readTextFile('./input.txt')
    ).split('\n\n');

    const rules = parseRules(rawRules);
    const nearbyTickets = parseNearbyTickets(rawNearbyTickets);

    return invalidNearbyTickets(rules, nearbyTickets);
  };

  console.log(await part1());
};
