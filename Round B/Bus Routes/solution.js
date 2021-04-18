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
    let [N, D] = readLine().split(' ').map(Number);
    let X = readLine().split(' ').map(Number);

    let ans = D;
    for (let i = X.length - 1; i >= 0; i--) {
      ans = ans - (ans % X[i]);
    }
    console.log(`Case #${t + 1}: ${ans}`);
  }
}
