const day5 = async () => {
  const data = (await Deno.readTextFile('./input.txt')).split('\n');

  const assignment1 = () => {
    const res = new Map<string, number>();
    for (let i = 0; i < data.length; i++) {
      const xy = data[i].split('->');
      const x1 = +xy[0].split(',')[0].trim();
      const y1 = +xy[0].split(',')[1].trim();
      const x2 = +xy[1].split(',')[0].trim();
      const y2 = +xy[1].split(',')[1].trim();

      const minX = Math.min(x1, x2);
      const maxX = Math.max(x1, x2);
      const minY = Math.min(y1, y2);
      const maxY = Math.max(y1, y2);

      if (!(minX === maxX || minY === maxY)) continue;

      for (let x11 = minX; x11 <= maxX; x11++) {
        for (let y11 = minY; y11 <= maxY; y11++) {
          if (res.has(`${x11}:${y11}`)) {
            res.set(`${x11}:${y11}`, 2);
          } else {
            res.set(`${x11}:${y11}`, 1);
          }
        }
      }
    }

    console.log(Array.from(res.values()).filter((x) => x === 2).length);
  };

  const assignment2 = () => {
    const res = new Map<string, number>();
    for (let i = 0; i < data.length; i++) {
      const xy = data[i].split('->');
      const x1 = +xy[0].split(',')[0].trim();
      const y1 = +xy[0].split(',')[1].trim();
      const x2 = +xy[1].split(',')[0].trim();
      const y2 = +xy[1].split(',')[1].trim();

      const minX = Math.min(x1, x2);
      const maxX = Math.max(x1, x2);
      const minY = Math.min(y1, y2);
      const maxY = Math.max(y1, y2);

      if (minX === maxX || minY === maxY) {
        for (let x11 = minX; x11 <= maxX; x11++) {
          for (let y11 = minY; y11 <= maxY; y11++) {
            if (res.has(`${x11}:${y11}`)) {
              res.set(`${x11}:${y11}`, 2);
            } else {
              res.set(`${x11}:${y11}`, 1);
            }
          }
        }
      } else {
        const length = Math.abs(x2 - x1);
        for (let i = 0; i < length + 1; i++) {
          const hx = x1 + (x2 - x1 > 0 ? 1 : -1) * i;
          const hy = y1 + (y2 - y1 > 0 ? 1 : -1) * i;
          if (res.has(`${hx}:${hy}`)) {
            res.set(`${hx}:${hy}`, 2);
          } else {
            res.set(`${hx}:${hy}`, 1);
          }
        }
      }
    }

    console.log(Array.from(res.values()).filter((x) => x === 2).length);
  };

  assignment1();
  assignment2();
};

await day5();
