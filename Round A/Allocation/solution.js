process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;

process.stdin.on('data', inputStdin => {
  inputString += inputStdin;
});

process.stdin.on('end', _ => {
  inputString = inputString
    .trim()
    .split('\n')
    .map(str => str.trim());
  solution();
});

function readLine() {
  return inputString[currentLine++];
}

function solution() {
  const T = Number(readLine());
  for (let t = 0; t < T; t++) {
    let [n, b] = readLine()
      .split(' ')
      .map(Number);
    let prices = readLine()
      .split(' ')
      .map(Number);
    prices.sort((a, b) => a - b);
    let sum = 0;
    let y = 0;

    for (let i = 0; i < prices.length; i++) {
      if (sum + prices[i] > b) {
        break;
      }
      sum += prices[i];
      y++;
    }
    console.log(`Case #${t + 1}: ${y}`);
  }
}
