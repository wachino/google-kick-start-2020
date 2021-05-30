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

let dp;
let preSum;

function solution() {
  const T = Number(readLine());
  for (let t = 0; t < T; t++) {
    let N = Number(readLine());
    let cards = readLine().split(/\s+/).map(Number);
    preSum = cards.slice();

    dp = cards.map(() => cards.map(() => -1));
    for (let i = 1; i < cards.length; i++) {
      preSum[i] += preSum[i - 1];
    }

    console.log(`Case #${t + 1}: ${expectedValue(0, N - 1)}`);
  }
}
function getSum(i, j) {
  if (j < i) {
    return 0;
  }
  return preSum[j] - (preSum[i - 1] || 0);
}

function expectedValue(i, j) {
  if (dp[i][j] !== -1) {
    return dp[i][j];
  }
  if (i === j) {
    dp[i][j] = 0;
  } else if (j <= i + 1) {
    dp[i][j] = getSum(i, j);
  } else {
    let sum = 0;
    for (let k = i; k < j; k++) {
      sum += expectedValue(i, k) + expectedValue(k + 1, j);
    }

    dp[i][j] = getSum(i, j) + sum / (j - i);
  }

  return dp[i][j];
}
