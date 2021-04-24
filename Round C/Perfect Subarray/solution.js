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
  let maxS = 1e7 + 1;
  let S = Array(maxS).fill(null);
  for (let i = 0; i < maxS; i++) {
    S[i] = i * i;
  }

  const T = Number(readLine());
  for (let t = 0; t < T; t++) {
    let N = Number(readLine());
    let arr = readLine().split(' ').map(Number);
    let res = arr.map(() => 0);
    let offset = 0;
    let max = Number.MIN_SAFE_INTEGER;
    let sum = 0;
    for (let i = 0; i < arr.length; i++) {
      sum += arr[i];
      if (sum < offset) {
        offset = sum;
      }
      if (sum > max) {
        max = sum;
      }
    }
    offset *= -1;

    let P = Array(max + offset + 1).fill(0);
    P[offset] = 1;

    sum = 0;
    for (let i = 0; i < arr.length; i++) {
      sum += arr[i];
      for (let j = 0; j < S.length && sum - S[j] + offset >= 0; j++) {
        res[i] += P[sum - S[j] + offset];
      }
      P[sum + offset]++;
    }
    console.log(`Case #${t + 1}: ${res.reduce((a, b) => a + b)}`);
  }
}
