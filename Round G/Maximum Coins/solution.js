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
    let N = Number(readLine());
    let coins = [];
    for (let i = 0; i < N; i++) {
      coins.push(readLine().split(/\s+/).map(BigInt));
    }
    let max = 0;
    for (let i = 0; i < N; i++) {
      let c = i;
      let r = 0;
      let sum = 0n;
      while (c < N && r < N) {
        sum += coins[r][c];
        c++;
        r++;
      }
      if (sum > max) {
        max = sum;
      }
    }
    for (let i = 1; i < N; i++) {
      let c = 0;
      let r = i;
      let sum = 0n;
      while (c < N && r < N) {
        sum += coins[r][c];
        c++;
        r++;
      }
      if (sum > max) {
        max = sum;
      }
    }
    console.log(`Case #${t + 1}: ${max}`);
  }
}
