const day12 = async () => {
  const input = (await Deno.readTextFile("./input.txt")).split("\n");

  type Direction = "F" | "L" | "R" | "N" | "S" | "E" | "W";
  type Degress = 0 | 90 | 180 | 270;

  interface Räjserbåten {
    Degrees: 0 | 90 | 180 | 270;
    Position: {
      Longitude: number;
      Latitude: number;
    };
  }

  const calculateNewDirection = (
    range: number,
    boat: Räjserbåten,
    rotation: "L" | "R"
  ) => {
    switch (rotation) {
      case "R": {
        boat.Degrees = (boat.Degrees - range <= 0
          ? boat.Degrees - range + 360 === 360
            ? 0
            : boat.Degrees - range + 360
          : boat.Degrees - range) as Degress;
        console.log(boat.Degrees);
        break;
      }
      case "L": {
        boat.Degrees = (boat.Degrees + range >= 360
          ? boat.Degrees + range - 360
          : boat.Degrees + range) as Degress;
        console.log(boat.Degrees);
        break;
      }
    }
  };

  const part1 = () => {
    const boat: Räjserbåten = {
      Degrees: 0,
      Position: {
        Latitude: 0,
        Longitude: 0,
      },
    };

    input.forEach((a) => {
      console.log(boat);
      const direction = a.slice(0, 1) as Direction;
      const range = +a.slice(1, a.length);
      switch (direction) {
        case "L":
        case "R": {
          calculateNewDirection(range, boat, direction);
          break;
        }
        case "N": {
          boat.Position.Latitude += range;
          break;
        }
        case "S": {
          boat.Position.Latitude -= range;
          break;
        }
        case "E": {
          boat.Position.Longitude += range;
          break;
        }
        case "W": {
          boat.Position.Longitude -= range;
          break;
        }
        case "F": {
          switch (boat.Degrees) {
            case 0:
              boat.Position.Longitude += range;
              break;
            case 90:
              boat.Position.Latitude += range;
              break;
            case 180:
              boat.Position.Longitude -= range;
              break;
            case 270:
              boat.Position.Latitude -= range;
              break;
          }
          break;
        }
      }
    });
    return Math.abs(boat.Position.Latitude) + Math.abs(boat.Position.Longitude);
  };

  console.log(part1());
};
await day12();
