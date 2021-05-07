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
    let K = Number(readLine());
    let pitches = readLine().split(' ').map(Number);
    let dp = pitches.map(() => Array(4).fill(0));
    for (let i = 1; i < pitches.length; i++) {
      for (let j = 0; j < 4; j++) {
        let min = -1;
        for (let k = 0; k < 4; k++) {
          let penalty =
            (pitches[i] > pitches[i - 1] && j <= k) ||
            (pitches[i] < pitches[i - 1] && j >= k) ||
            (pitches[i] === pitches[i - 1] && j !== k)
              ? 1
              : 0;
          if (min === -1 || dp[i - 1][k] + penalty < min) {
            min = dp[i - 1][k] + penalty;
          }
        }
        dp[i][j] = min;
      }
    }

    console.log(`Case #${t + 1}: ${Math.min(...dp[dp.length - 1])}`);
  }
}
