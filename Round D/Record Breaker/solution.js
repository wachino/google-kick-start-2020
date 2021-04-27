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
    let visitors = readLine().split(' ').map(Number);
    let max = -1;
    let recordBreakers = 0;
    for (let i = 0; i < N; i++) {
      if (visitors[i] > max) {
        if (i >= visitors.length - 1 || visitors[i] > visitors[i + 1]) {
          recordBreakers++;
        }
        max = visitors[i];
      }
    }

    console.log(`Case #${t + 1}: ${recordBreakers}`);
  }
}
