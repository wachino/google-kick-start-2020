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
    let [W, N] = readLine().split(/\s+/).map(Number);
    let wheels = readLine().split(/\s+/).map(Number);
    wheels.sort((a, b) => a - b);
    let preSum = wheels.slice();
    for (let i = 1; i < preSum.length; i++) {
      preSum[i] += preSum[i - 1];
    }
    function getSum(i, j) {
      if (i > j) {
        return 0;
      }
      return preSum[j] - (preSum[i - 1] || 0);
    }
    let min = Number.MAX_SAFE_INTEGER;
    for (let i = 0; i < wheels.length; i++) {
      let target = wheels[i];
      let left = 0;
      let right = i;
      let mid;
      while (left < right) {
        mid = (left + right) >> 1;
        if (target - wheels[mid] > N - target + wheels[mid]) {
          left = mid + 1;
        } else {
          right = mid;
        }
      }
      let sumMoves = 0;
      let p = left;
      sumMoves += (i - p + 1) * target - getSum(p, i);
      sumMoves += p * (N - target) + getSum(0, p - 1);

      left = i;
      right = W - 1;
      mid;
      while (left < right) {
        mid = (left + right + 1) >> 1;
        if (wheels[mid] - target > N - wheels[mid] + target) {
          right = mid - 1;
        } else {
          left = mid;
        }
      }
      let b = left;

      sumMoves += getSum(i + 1, b) - (b - i) * target;
      sumMoves += (W - b - 1) * (N + target) - getSum(b + 1, W - 1);

      if (sumMoves < min) {
        min = sumMoves;
      }
    }
    console.log(`Case #${t + 1}: ${min}`);
  }
}
