const day7 = async () => {
  interface Bag {
    name: string;
    count: number;
  }

  interface OuterBag extends Bag {
    holds: Bag[];
  }

  const input = (await Deno.readTextFile("./input.txt")).split("\n");

  const mapInnerBag = (innerBags: string[]) => {
    return innerBags.map(
      (bag): Bag => {
        const match = /(\d)(.*)/.exec(bag) as RegExpExecArray;
        return {
          count: +match[1],
          name: match[2]
            .replace(".", "")
            .replace("bags", "")
            .replace("bag", "")
            .trim(),
        };
      }
    );
  };

  const bags = input.map(
    (line): OuterBag => {
      const [outerBag] = /(.+?(?=bags))/.exec(line) as RegExpExecArray;

      const innerBags = /(\d).*/.exec(line);
      if (!innerBags) return { name: outerBag.trim(), count: 1, holds: [] };

      let bags: Bag[] = [];
      if (!innerBags[0].includes(",")) bags = mapInnerBag([innerBags[0]]);
      else bags = mapInnerBag(innerBags[0].split(","));

      return { name: outerBag.trim(), count: 1, holds: bags };
    }
  );

  const part1 = () => {
    const containsBag = (
      allBags: OuterBag[],
      searchingFor: string,
      bagSet: Set<string>
    ): Set<string> => {
      const bag = allBags.filter((bag) =>
        bag.holds.some((innerbag) => innerbag.name === searchingFor)
      );
      bag.forEach((bag) => {
        bagSet.add(bag.name);
        return containsBag(allBags, bag.name, bagSet);
      });

      return bagSet;
    };

    console.log(containsBag(bags, "shiny gold", new Set()).size);
  };

  const part2 = () => {
    const countBags = (allBags: OuterBag[], searchingFor: string): number => {
      return allBags
        .find((outerBag) => outerBag.name === searchingFor)
        ?.holds.reduce((previous, { name, count }) => {
          return previous + count + count * countBags(allBags, name);
        }, 0) as number;
    };

    console.log(countBags(bags, "shiny gold"));
  };

  part1();
  part2();
};

await day7();
