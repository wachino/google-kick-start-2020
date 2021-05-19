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
    let [N, A, B, C] = readLine().split(/\s+/).map(Number);
    let isImpossible = A > N || B > N || A < C || B < C || A + B - C > N; //s|| (A == 1 && B == 1 && C == 1 && N > 1);
    let sol = [];
    let hidden = false;
    let mustHide = N - (A + B - C) > 0;
    if (!isImpossible) {
      for (let i = 0; i < C; i++) {
        sol.push(N);
      }
      if (C > 1) {
        for (let i = 0; i < N - (A + B - C); i++) {
          sol.splice(1, 0, 1);
        }
        hidden = true;
      }
      if (!hidden && A > C) {
        for (let i = 0; i < N - (A + B - C); i++) {
          sol.unshift(1);
        }
        hidden = true;
      }
      for (let i = 0; i < A - C; i++) {
        sol.unshift(N - i - 1);
      }
      if (!hidden && B > C) {
        for (let i = 0; i < N - (A + B - C); i++) {
          sol.push(1);
        }
        hidden = true;
      }
      for (let i = 0; i < B - C; i++) {
        sol.push(N - i - 1);
      }
    }
    console.log(
      `Case #${t + 1}: ${isImpossible || !hidden & mustHide ? 'IMPOSSIBLE' : sol.join(' ')}`
    );
  }
}
