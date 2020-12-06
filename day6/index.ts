const day6 = async () => {
  interface Group {
    points: Set<string>;
  }

  const mapGroup = (groupIndividualAnswers: string[]): Group => {
    const groupUnifiedAnswers: Group = { points: new Set() };
    groupIndividualAnswers.forEach((answer) => {
      answer.split("").forEach((letter) => {
        groupUnifiedAnswers.points.add(letter);
      });
    });
    return groupUnifiedAnswers;
  };

  const part1 = async () => {
    const yesAnswers = (await Deno.readTextFile("./input.txt"))
      .split("\n\n")
      .reduce((yesAnswers, stringGroup) => {
        const groupIndividualAnswers = stringGroup.split("\n");
        const groupUnifiedAnswers = mapGroup(groupIndividualAnswers);
        return yesAnswers + groupUnifiedAnswers.points.size;
      }, 0);

    console.log(yesAnswers);
  };

  const part2 = async () => {
    const yesAnswers = (await Deno.readTextFile("./input.txt"))
      .split("\n\n")
      .reduce((yesAnswers, stringGroup) => {
        const groupIndividualAnswers = stringGroup.split("\n");
        const groupUnifiedAnswers = mapGroup(groupIndividualAnswers);
        const everyonesYesAnswer = [
          ...groupUnifiedAnswers.points,
        ].filter((unifiedAnswer) =>
          groupIndividualAnswers.every((individualAnswer) =>
            individualAnswer.includes(unifiedAnswer)
          )
        );
        return yesAnswers + everyonesYesAnswer.length;
      }, 0);

    console.log(yesAnswers);
  };

  await part1();
  await part2();
};

await day6();
