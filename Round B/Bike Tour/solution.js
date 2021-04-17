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
    let H = readLine().split(' ').map(Number);

    let peaks = 0;
    for (let i = 1; i < H.length - 1; i++) {
      if (H[i] > H[i - 1] && H[i] > H[i + 1]) {
        peaks++;
      }
    }
    console.log(`Case #${t + 1}: ${peaks}`);
  }
}
