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
const nMax = 2e5 + 1;
let logFact = Array(nMax).fill(null);

function solution() {
  logFact[0] = 0;
  for (let i = 1; i < nMax; i++) {
    logFact[i] = logFact[i - 1] + Math.log2(i);
  }

  const T = Number(readLine());
  for (let t = 0; t < T; t++) {
    [W, H, L, U, R, D] = readLine().split(' ').map(Number);
    let comp = 0;
    if (W === 1 || H === 1) {
      comp = 1;
    } else {
      if (U > 1) {
        for (let i = L; i <= Math.min(R, W - 1); i++) {
          comp += 0.5 * pathsProb(U - 1, i);
        }
        if (R === W) {
          for (let i = U - 1; i > 0; i--) {
            comp += 0.5 * pathsProb(i, W - 1);
          }
        }
      }

      if (L > 1) {
        for (let i = U; i <= Math.min(D, H - 1); i++) {
          comp += 0.5 * pathsProb(i, L - 1);
        }
        if (D === H) {
          for (let i = L - 1; i > 0; i--) {
            comp += 0.5 * pathsProb(H - 1, i);
          }
        }
      }
    }
    console.log(`Case #${t + 1}: ${1 - comp}`);
  }
}

function pathsProb(x, y) {
  if (x === 0 || y === 0) {
    return 0;
  }
  if (x === 1 && y === 1) {
    return 1;
  }
  let n = x + y - 2;
  let k = y - 1;
  return Math.pow(2, logFact[n] - logFact[k] - logFact[n - k] - n);
}
