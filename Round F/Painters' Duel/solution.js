process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;

process.stdin.on('data', (inputStdin) => {
  inputString += inputStdin;
});

process.stdin.on('end', (_) => {
  inputString = inputString
    .trim()
    .split('\n')
    .map((str) => str.trim());
  solution();
});

function readLine() {
  return inputString[currentLine++];
}
function solution() {
  const T = Number(readLine());
  for (let t = 0; t < T; t++) {
    let [S, Ra, Pa, Rb, Pb, C] = readLine().split(/\s+/).map(Number);
    let museum = Array(S * S)
      .fill(null)
      .map(() => 0);

    museum[getIndexOfRoom(Ra, Pa)] = 1;
    museum[getIndexOfRoom(Rb, Pb)] = 1;
    for (let i = 0; i < C; i++) {
      let [r, p] = readLine().split(/\s+/).map(Number);
      museum[getIndexOfRoom(r, p)] = 1;
    }

    console.log(
      `Case #${t + 1}: ${getScoreAlma(
        museum,
        0,
        { row: Ra, position: Pa },
        { row: Rb, position: Pb },
        S
      )}`
    );
  }
}

function getIndexOfRoom(row, position) {
  return position - 1 + (row - 1) ** 2;
}

function getNeighbours(row, position, S) {
  let neigbours = [];
  if (position > 1) {
    neigbours.push({ row, position: position - 1 });
  }
  if (position < 2 * row - 1) {
    neigbours.push({ row, position: position + 1 });
  }
  if (position % 2 == 1 && row < S) {
    neigbours.push({ row: row + 1, position: position + 1 });
  }
  if (position % 2 == 0) {
    neigbours.push({ row: row - 1, position: position - 1 });
  }
  return neigbours;
}

function getScoreAlma(museum, score, A, B, S) {
  let neigh = getNeighbours(A.row, A.position, S);
  let scores = [];
  let moved = false;
  for (let i = 0; i < neigh.length; i++) {
    let n = neigh[i];
    if (museum[getIndexOfRoom(n.row, n.position)] === 0) {
      let m = museum.slice();
      m[getIndexOfRoom(n.row, n.position)] = 1;
      scores.push(getScoreBerthe(m, 1 + score, n, B, S));
      moved = true;
    }
  }
  if (!moved) {
    if (
      getNeighbours(B.row, B.position, S).some(
        (n) => museum[getIndexOfRoom(n.row, n.position)] === 0
      )
    ) {
      scores.push(getScoreBerthe(museum, score, A, B, S));
    } else {
      scores.push(score);
    }
  }
  return Math.max(...scores);
}

function getScoreBerthe(museum, score, A, B, S) {
  let neigh = getNeighbours(B.row, B.position, S);
  let scores = [];
  let moved = false;
  for (let i = 0; i < neigh.length; i++) {
    let n = neigh[i];
    if (museum[getIndexOfRoom(n.row, n.position)] === 0) {
      let m = museum.slice();
      m[getIndexOfRoom(n.row, n.position)] = 1;
      scores.push(getScoreAlma(m, score - 1, A, n, S));
      moved = true;
    }
  }
  if (!moved) {
    if (
      getNeighbours(A.row, A.position, S).some(
        (n) => museum[getIndexOfRoom(n.row, n.position)] === 0
      )
    ) {
      scores.push(getScoreAlma(museum, score, A, B, S));
    } else {
      scores.push(score);
    }
  }
  return Math.min(...scores);
}
