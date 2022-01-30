const day21 = async () => {
  const input = (await Deno.readTextFile('./input.txt'))
    .split('\n')
    .map((x) => x.split(' starting position: '));

  const hasScore = (
    playersMap: Map<string, { position: number; score: number }>,
    score: number
  ) => {
    return (
      playersMap.get('Player 1')!.score >= score ||
      playersMap.get('Player 2')!.score >= score
    );
  };

  const assignment1 = () => {
    const playersMap: Map<string, { position: number; score: number }> =
      new Map([
        [input[0][0], { position: +input[0][1], score: 0 }],
        [input[1][0], { position: +input[1][1], score: 0 }],
      ]);

    let diceRolls = 1;
    let turn = 0;
    let totalDiceRoles = 0;
    while (!hasScore(playersMap, 1000)) {
      let currentDiceRoll = 0;
      for (let i = diceRolls; i < diceRolls + 3; i++) {
        totalDiceRoles++;
        currentDiceRoll += i;
      }

      const playerKey = turn % 2 === 0 ? 'Player 1' : 'Player 2';

      const player = playersMap.get(playerKey)!;
      const total =
        (player.position + currentDiceRoll) % 10 === 0
          ? 10
          : (player.position + currentDiceRoll) % 10;
      player.score += total;
      player.position = total;

      playersMap.set(playerKey, {
        position: player.position,
        score: player.score,
      });

      turn++;
      diceRolls += 3;
    }

    console.log(
      Math.min(...Array.from(playersMap).map(([_, val]) => val.score)) *
        totalDiceRoles
    );
  };

  assignment1();
};

await day21();
