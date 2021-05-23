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
    let [N, X] = readLine().split(/\s+/).map(Number);
    let amounts = readLine().split(/\s+/).map(Number);
    let newAmounts = amounts
      .map((amount, i) => ({ steps: Math.ceil(amount / X), i }))
      .sort((a, b) => {
        if (a.steps === b.steps) {
          return a.i - b.i;
        }
        return a.steps - b.steps;
      });
    /*   .map((a, i) => ({ ...a, p: i + 1 }))
      .sort((a, b) => a.i - b.i); */
    console.log(`Case #${t + 1}: ${newAmounts.map((a) => a.i + 1).join(' ')}`);
  }
}
