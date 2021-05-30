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
    let cards = readLine().split(/\s+/).map(Number);
    let preSum = cards.slice();
    let dp = Array(N)
      .fill(0)
      .map(() => Array(N).fill(-1));
    let leftExpectedSum = Array(N).fill(0);
    let rightExpectedSum = Array(N).fill(0);

    for (let i = 0; i < cards.length; i++) {
      dp[i][i] = 0;
      if (i > 0) {
        preSum[i] += preSum[i - 1];
      }
    }
    for (let l = 1; l < N; l++) {
      for (let i = 0; i < N - l; i++) {
        let j = i + l;
        let sum = leftExpectedSum[i] + rightExpectedSum[j];
        dp[i][j] = preSum[j] - (preSum[i - 1] || 0) + sum / (j - i);
        leftExpectedSum[i] += dp[i][j];
        rightExpectedSum[j] += dp[i][j];
      }
    }

    console.log(`Case #${t + 1}: ${dp[0][N - 1]}`);
  }
}
