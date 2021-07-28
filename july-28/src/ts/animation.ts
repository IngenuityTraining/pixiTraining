const w = 52;
const h = 93;
export const animations:{[key:string]: number[][]} = {
  still: [
    [0, 0, w, h],
  ],
  idle: [
    [0, 0, w, h],
    [w, 0, w, h],
    [w * 2, 0, w, h],
  ],
  punch: [
    [0, 90, 62, 85],
    [62, 90, 65, 85],
    [125, 90, 65, 85],
    [190, 90, 65, 85],
  ],
};

export const dinoAnimFrames: {[key:string]: string[]} = {
  idle: [
    'Idle (1).png',
    'Idle (2).png',
    'Idle (3).png',
    'Idle (4).png',
    'Idle (5).png',
    'Idle (6).png',
    'Idle (7).png',
    'Idle (8).png',
    'Idle (9).png',
    'Idle (10).png',
  ],
  walk: [
    'Walk (1).png',
    'Walk (2).png',
    'Walk (3).png',
    'Walk (4).png',
    'Walk (5).png',
    'Walk (6).png',
    'Walk (7).png',
    'Walk (8).png',
    'Walk (9).png',
    'Walk (10).png',
  ],
};
