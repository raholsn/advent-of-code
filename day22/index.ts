const day22 = async () => {
  const debug = false;

  const parseDecks = (input: string[]) => {
    const [deck1, deck2] = input.map((x) => x.replace(/\n+$/, ''));
    return {
      deck1: deck1
        .split('\n')
        .slice(1, deck1.length)
        .map((x) => +x),
      deck2: deck2
        .split('\n')
        .splice(1, deck2.length)
        .map((x) => +x),
    };
  };

  function log(str: string | number) {
    if (debug) console.log(str);
  }

  const determineTurnWinner = (
    roundWinner: number,
    card1: number,
    card2: number,
    deck1: number[],
    deck2: number[],
    round: number,
    game: number
  ) => {
    if (roundWinner === 1) {
      deck1.push(card1);
      deck1.push(card2);
      log(`Player 1 wins round ${round} of game ${game}!\n`);
    } else {
      deck2.push(card2);
      deck2.push(card1);
      log(`Player 2 wins round ${round} of game ${game}!\n`);
    }
  };

  const playCrabCombat = (deck1: number[], deck2: number[]) => {
    let round = 0;
    while (true) {
      round++;

      const card1 = deck1.shift();
      if (card1 === undefined) break;

      const card2 = deck2.shift();
      if (card2 === undefined) break;

      const raftCaptain = card1 > card2 ? 1 : 0;
      determineTurnWinner(raftCaptain, card1, card2, deck1, deck2, round, 1);
    }

    return deck1.length !== 0 ? deck1 : deck2;
  };

  const part1 = async () => {
    const decks = (await Deno.readTextFile('./input.txt')).split('\n\n');
    const { deck1, deck2 } = parseDecks(decks);

    const winner = playCrabCombat(deck1, deck2);
    const score = winner.reduce(
      (prev, curr, index) => prev + curr * (winner.length - index),
      0
    );

    console.log(score);
  };

  const playRecursiveCrabCombat = (
    deck1: number[],
    deck2: number[],
    game: number
  ): { raftCaptain: number; deck: number[] } => {
    let round = 0;
    game++;
    log(`=== Game ${game} ===\n`);

    const turnHistory = new Set<string>();
    while (true) {
      round++;

      log(`-- Round ${round} (Game ${game}) --`);
      log(`Player 1's deck:${deck1}`);
      log(`Player 2's deck:${deck2}`);

      const card1 = deck1.shift();
      if (card1 === undefined) break;

      const card2 = deck2.shift();
      if (card2 === undefined) break;

      log(`Player 1 plays:${card1}`);
      log(`Player 2 plays:${card2}`);

      if (turnHistory.has(deck1.join(',') + 'vs' + deck2.join(','))) {
        return {
          raftCaptain: 1,
          deck: deck1,
        };
      }
      turnHistory.add(deck1.join(',') + 'vs' + deck2.join(','));

      if (deck1.length >= card1 && deck2.length >= card2) {
        log('Playing a sub-game to determine the winner...');

        const { raftCaptain } = playRecursiveCrabCombat(
          deck1.slice(0, card1),
          deck2.slice(0, card2),
          game
        );

        determineTurnWinner(
          raftCaptain,
          card1,
          card2,
          deck1,
          deck2,
          round,
          game
        );
      } else {
        determineTurnWinner(
          card1 > card2 ? 1 : 0,
          card1,
          card2,
          deck1,
          deck2,
          round,
          game
        );
      }
    }

    if (deck1.length !== 0) {
      log(`The winner of game ${game} is player 1!\n`);
      return {
        raftCaptain: 1,
        deck: deck1,
      };
    } else {
      log(`The winner of game ${game} is player 2!\n`);
      return {
        raftCaptain: 2,
        deck: deck2,
      };
    }
  };

  const part2 = async () => {
    const decks = (await Deno.readTextFile('./input.txt')).split('\n\n');
    const { deck1, deck2 } = parseDecks(decks);

    const { deck } = playRecursiveCrabCombat(deck1, deck2, 0);
    const score = deck.reduce(
      (prev, curr, index) => prev + curr * (deck.length - index),
      0
    );

    console.log(score);
  };

  await part1();
  await part2();
};

await day22();
