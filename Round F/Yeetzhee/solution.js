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

let dp = {};

function solution() {
  const T = Number(readLine());
  for (let t = 0; t < T; t++) {
    let [N, M, K] = readLine().split(/\s+/).map(Number);
    let groups = Array(M - K).fill(0);
    for (let i = 0; i < K; i++) {
      groups.push(Number(readLine()));
    }
    dp = {};
    dp[groups.join(',')] = 0;
    console.log(`Case #${t + 1}: ${expectedRoll(Array(M).fill(0), groups)}`);
  }
}

function expectedRoll(from, target) {
  if (dp[from.join(',')] == undefined) {
    let total = 0;
    let dest = 0;
    let nextStateSum = 0;
    for (let i = 0; i < target.length; i++) {
      if (i === 0 || from[i] != from[i - 1]) {
        dest = 1;
      } else {
        dest++;
      }
      if ((i === target.length - 1 || from[i] !== from[i + 1]) && from[i] < target[i]) {
        from[i]++;
        total += dest;
        nextStateSum += dest * expectedRoll(from, target);
        from[i]--;
      }
    }
    dp[from.join(',')] = (target.length + nextStateSum) / total;
  }
  return dp[from.join(',')];
}
