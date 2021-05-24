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
    let [N, K] = readLine().split(/\s+/).map(Number);
    let intervals = [];
    for (let i = 0; i < N; i++) {
      let [s, e] = readLine().split(/\s+/).map(Number);
      intervals.push({ s, e });
    }
    intervals.sort((a, b) => a.s - b.s);
    let minRobots = 0;
    let lastVisited = 0;
    for (let i = 0; i < intervals.length; i++) {
      lastVisited = Math.max(lastVisited, intervals[i].s);
      let robotsNeeded = Math.ceil((intervals[i].e - lastVisited) / K);
      minRobots += robotsNeeded;
      lastVisited += robotsNeeded * K;
    }
    console.log(`Case #${t + 1}: ${minRobots}`);
  }
}
