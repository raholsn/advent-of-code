const day19 = async () => {
  const parseMessage = (unParsedMessage: string) => unParsedMessage.split('\n');

  const parseRules = (unParsedRules: string) => {
    const rows = unParsedRules.split('\n');
    const rules: Record<string, string> = {};
    rows.forEach((row) => {
      const splitRow = row.split(':');
      rules[splitRow[0]] = splitRow[1].trim();
    });

    return rules;
  };

  const getRegex = (rule: string, rules: Record<string, string>): string => {
    let regex = '';
    if (rule[0].match(/^[0-9]+$/) === null) {
      regex = rule[1];
    } else {
      const [first, second] = rule.split(' | ');
      if (second !== undefined)
        regex = `(${getRegex(first, rules)}|${getRegex(second, rules)})`;
      else {
        regex = first
          .split(' ')
          .map((i) => getRegex(rules[i.trim()], rules))
          .join('');
      }
    }

    return regex;
  };

  const part1 = async () => {
    const [unParsedRules, unParsedMessages] = (
      await Deno.readTextFile('./input.txt')
    ).split('\n\n');
    const rules = parseRules(unParsedRules);
    const messages = parseMessage(unParsedMessages);

    const rule0 = getRegex(rules[0], rules);

    const regexp = new RegExp(`^${rule0}$`);
    const result = messages.reduce(
      (prev, curr) => (regexp.test(curr) ? (+prev + 1).toString() : prev),
      '0'
    );

    console.log(result);
  };

  await part1();
};

await day19();
