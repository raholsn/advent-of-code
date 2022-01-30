export const day12Part2 = async () => {
  const input = (await Deno.readTextFile("./input.txt")).split("\n");

  type Degrees = 90 | 180 | 270;
  type Direction = "F" | "L" | "R" | "N" | "S" | "E" | "W";

  interface Räjserbåten {
    Position: {
      Latitude: number;
      Longitude: number;
    };
  }

  // deno-lint-ignore no-empty-interface
  interface Waypoint extends Räjserbåten {}

  const calculateNewWaypointDirection = (
    degress: Degrees,
    waypoint: Waypoint,
    rotation: "L" | "R"
  ) => {
    const latitude = waypoint.Position.Latitude;
    const longitude = waypoint.Position.Longitude;

    if (rotation === "L") {
      if (degress === 90) {
        waypoint.Position.Longitude = -latitude;
        waypoint.Position.Latitude = longitude;
      } else if (degress === 180) {
        waypoint.Position.Longitude = -longitude;
        waypoint.Position.Latitude = -latitude;
      } else if (degress === 270) {
        waypoint.Position.Longitude = latitude;
        waypoint.Position.Latitude = -longitude;
      }
    } else if (rotation === "R") {
      if (degress === 90) {
        waypoint.Position.Longitude = latitude;
        waypoint.Position.Latitude = -longitude;
      } else if (degress === 180) {
        waypoint.Position.Longitude = -longitude;
        waypoint.Position.Latitude = -latitude;
      } else if (degress === 270) {
        waypoint.Position.Longitude = -latitude;
        waypoint.Position.Latitude = longitude;
      }
    }
  };

  const part2 = () => {
    const boat: Räjserbåten = {
      Position: {
        Latitude: 0,
        Longitude: 0,
      },
    };

    const waypoint: Waypoint = {
      Position: {
        Latitude: 1,
        Longitude: 10,
      },
    };

    input.forEach((a) => {
      const direction = a.slice(0, 1) as Direction;
      const range = +a.slice(1, a.length);

      switch (direction) {
        case "L":
        case "R": {
          calculateNewWaypointDirection(range as Degrees, waypoint, direction);
          break;
        }
        case "N": {
          waypoint.Position.Latitude += range;
          break;
        }
        case "S": {
          waypoint.Position.Latitude -= range;
          break;
        }
        case "E": {
          waypoint.Position.Longitude += range;
          break;
        }
        case "W": {
          waypoint.Position.Longitude -= range;
          break;
        }
        case "F": {
          boat.Position.Latitude += range * waypoint.Position.Latitude;
          boat.Position.Longitude += range * waypoint.Position.Longitude;
          break;
        }
      }
    });

    return Math.abs(boat.Position.Latitude) + Math.abs(boat.Position.Longitude);
  };

  return part2();
};
await day12Part2();
