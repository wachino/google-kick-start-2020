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
  const START = 'START';
  const KICK = 'KICK';
  for (let t = 0; t < T; t++) {
    let S = readLine();
    let countStarts = Array(S.length).fill(0);
    let k = 0;
    for (let i = 0; i < S.length; i++) {
      if (S[i] !== START[k]) {
        k = 0;
      }
      while (S[i] === START[k]) {
        k++;
        if (k === START.length) {
          k = 0;
          countStarts[i]++;
        }
      }
    }
    for (let i = countStarts.length - 1; i >= 0; i--) {
      countStarts[i] += countStarts[i + 1] | 0;
    }
    let countKickStarts = 0;
    k = 0;
    for (let i = 0; i < S.length; i++) {
      if (S[i] !== KICK[k]) {
        k = 0;
      }
      while (S[i] === KICK[k]) {
        k++;
        if (k === KICK.length) {
          k = 0;
          countKickStarts += countStarts[i];
        }
      }
    }
    console.log(`Case #${t + 1}: ${countKickStarts}`);
  }
}
