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
    let sessionMinutes = readLine().split(' ').map(Number);
    let right = getMaxDiff(sessionMinutes);
    let left = 1;
    let middle;
    while (left < right) {
      middle = (left + right) >> 1;
      let rk = getRequiredK(sessionMinutes, middle);
      if (rk > K) {
        left = middle + 1;
      } else {
        right = middle;
      }
    }
    console.log(`Case #${t + 1}: ${left}`);
  }
}

function getRequiredK(sessionMinutes, dOptimal) {
  let required = 0;
  for (let i = 1; i < sessionMinutes.length; i++) {
    required += Math.ceil((sessionMinutes[i] - sessionMinutes[i - 1]) / dOptimal) - 1;
  }
  return required;
}

function getMaxDiff(sessionMinutes) {
  let maxDiff = sessionMinutes[1] - sessionMinutes[0];
  for (let i = 1; i < sessionMinutes.length; i++) {
    if (sessionMinutes[i] - sessionMinutes[i - 1] > maxDiff) {
      maxDiff = sessionMinutes[i] - sessionMinutes[i - 1];
    }
  }
  return maxDiff;
}
