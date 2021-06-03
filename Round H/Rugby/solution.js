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
    const N = Number(readLine());
    let coordinates = [];
    for (let i = 0; i < N; i++) {
      let [x, y] = readLine().split(/\s+/).map(Number);
      coordinates.push({ x, y });
    }
    let byRow = coordinates.slice().sort((a, b) => a.y - b.y);
    let byCol = coordinates
      .slice()
      .sort((a, b) => a.x - b.x)
      .map((a, i) => ({ ...a, c: a.x - i }))
      .sort((a, b) => a.c - b.c);
    let targetRow = byRow[Math.floor(N / 2)].y;
    let targetCol = byCol[Math.floor(N / 2)].c;
    let cost = 0;
    for (let i = 0; i < N; i++) {
      cost += Math.abs(byRow[i].y - targetRow);
      cost += Math.abs(byCol[i].c - targetCol);
    }
    console.log(`Case #${t + 1}: ${cost}`);
  }
}
