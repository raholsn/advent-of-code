const day21 = async () => {
  interface Recipe {
    ingredients: string[];
    allergens: string[];
  }

  const parse = (unParsedRecipe: string[]) => {
    const recipes: Recipe[] = [];
    unParsedRecipe.forEach((r) => {
      const recipe: Recipe = {
        allergens: [],
        ingredients: [],
      };
      const [i, a] = r.split('(contains ');

      recipes.push({
        allergens: recipe.allergens.concat(
          a.replace(')', '').trim().split(' ')
        ),
        ingredients: recipe.ingredients.concat(i.trim().split(' ')),
      });
    });

    return recipes;
  };

  const intersectAllergens = (allergens: Record<string, Set<string[]>>) => {
    const intersectedAllergens: Record<string, Set<string>> = {};
    for (const a in allergens) {
      const as = allergens[a];
      let newArr: string[] = [];
      as.forEach((set) => {
        if (newArr.length === 0) newArr = set;
        newArr = newArr.filter((x) => set.includes(x));
      });

      intersectedAllergens[a] = new Set(newArr);
    }

    return intersectedAllergens;
  };

  const determineAllergens = (
    intersectedAllergens: Record<string, Set<string>>
  ) => {
    while (true) {
      if (Object.values(intersectedAllergens).every((a) => a.size === 1)) break;
      for (const allergens in intersectedAllergens) {
        const allergensVal = intersectedAllergens[allergens];
        const determinedVal = [...allergensVal].join('');

        for (const allergens2 in intersectedAllergens) {
          if (allergens2 === allergens) continue;

          const av = intersectedAllergens[allergens2];
          if (av.has(determinedVal)) {
            av.delete(determinedVal);
            intersectedAllergens[allergens2] = av;
          }
        }
      }
    }

    const result: Record<string, string> = {};
    for (const a in intersectedAllergens) {
      const av = intersectedAllergens[a];
      result[a] = [...av][0];
    }
    return result;
  };

  const arrangeRecipes = (recipes: Recipe[]) => {
    const mappedAllergens: Record<string, Set<string[]>> = {};
    for (let i = 0; i < recipes.length; i++) {
      const ing = recipes[i].allergens.map((x) => x.replace(',', ''));
      for (let j = 0; j < ing.length; j++) {
        if (mappedAllergens[ing[j]] === undefined)
          mappedAllergens[ing[j]] = new Set<string[]>();

        if (ing[j]) mappedAllergens[ing[j]].add(recipes[i].ingredients);
      }
    }
    return mappedAllergens;
  };

  const countIngredientWithoutAllergens = (
    allergens: Record<string, string>,
    recipes: Recipe[]
  ) => {
    const determinedIngredients = Object.values(allergens);

    let count = 0;
    recipes.forEach((r) => {
      r.ingredients.forEach((i) => {
        if (!determinedIngredients.includes(i)) count++;
      });
    });
    return count;
  };

  const part1 = async () => {
    const unParsedRecipes = (await Deno.readTextFile('./input.txt')).split(
      '\n'
    );

    const recipes = parse(unParsedRecipes);
    const arrangedAllergens = arrangeRecipes(recipes);
    const intersectedAllergens = intersectAllergens(arrangedAllergens);
    const allergens = determineAllergens(intersectedAllergens);
    const count = countIngredientWithoutAllergens(allergens, recipes);

    return { allergens, count };
  };

  const part2 = async () => {
    const { allergens } = await part1();
    return Object.keys(allergens)
      .sort()
      .map((allergen) => allergens[allergen])
      .join(',');
  };

  console.log((await part1()).count);
  console.log(await part2());
};

await day21();
