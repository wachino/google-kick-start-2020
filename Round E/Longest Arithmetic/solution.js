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
    let arr = readLine().split(' ').map(Number);
    let currentLength;
    let current;
    let longest = 1;
    for (let i = 1; i < N; i++) {
      if (arr[i] - arr[i - 1] === current) {
        currentLength++;
      } else {
        currentLength = 2;
        current = arr[i] - arr[i - 1];
      }

      if (currentLength > longest) {
        longest = currentLength;
      }
    }
    console.log(`Case #${t + 1}: ${longest}`);
  }
}
