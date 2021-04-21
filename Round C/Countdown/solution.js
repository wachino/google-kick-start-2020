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
    let [N, K] = readLine().split(' ').map(Number);
    let arr = readLine().split(' ').map(Number);
    let isCountDown = false;
    let ans = 0;
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] === K) {
        isCountDown = true;
      } else if (isCountDown) {
        if (arr[i] !== arr[i - 1] - 1) {
          isCountDown = false;
        } else if (arr[i] === 1) {
          ans++;
          isCountDown = false;
        }
      }
    }
    console.log(`Case #${t + 1}: ${ans}`);
  }
}
