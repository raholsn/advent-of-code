const day20 = async () => {
  const [algorithm, image] = (await Deno.readTextFile('./input.txt')).split(
    '\n\n'
  );

  const get = (input: string[], y: number, x: number, step: number) => {
    if (input[y] && input[y][x]) {
      return input[y][x] === '#' ? '1' : '0';
    }
    return step % 2 ? '1' : '0';
  };

  const calculate = (steps: number) => {
    let newImage = image.split('\n');
    let currentImage: string[] = [];

    for (let step = 0; step < steps; step++) {
      for (let y = -1; y < newImage.length + 1; y++) {
        currentImage.push('');
        for (let x = -1; x < newImage[0].length + 1; x++) {
          let binary = '';

          binary += get(newImage, y - 1, x - 1, step); //top left
          binary += get(newImage, y - 1, x, step); //top
          binary += get(newImage, y - 1, x + 1, step); //top right
          binary += get(newImage, y, x - 1, step); //left
          binary += get(newImage, y, x, step); //middle
          binary += get(newImage, y, x + 1, step); //right
          binary += get(newImage, y + 1, x - 1, step); //bottom left
          binary += get(newImage, y + 1, x, step); //bottom
          binary += get(newImage, y + 1, x + 1, step); //bottom right

          const index = parseInt(binary, 2);
          currentImage[currentImage.length - 1] += algorithm[index];
        }
      }

      newImage = currentImage;
      currentImage = [];
    }

    console.log(newImage.join('').replaceAll('.', '').length);
  };

  const assignment1 = () => calculate(2);
  const assignment2 = () => calculate(50);

  assignment1();
  assignment2();
};

await day20();
