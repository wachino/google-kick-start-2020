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
    let [L, R] = readLine().split(/\s+/).map(BigInt);
    console.log(`Case #${t + 1}: ${boredNumbersUntil(R) - boredNumbersUntil(L - 1n)}`);
  }
}

function boredNumbersUntil(n) {
  let bored = 0n;
  let mul = 1n;
  let exp = 0n;
  while (10n ** (exp + 1n) <= n) {
    mul *= 5n;
    bored += mul;
    exp++;
  }
  let i = 1n;
  while (i <= n) {
    while ((i + 1n) * 10n ** exp <= n) {
      if (isBored(i)) {
        bored += mul;
      }
      i++;
    }
    if (i == n && isBored(i)) {
      bored += mul;
    }
    mul /= 5n;
    i *= 10n;
    exp--;
  }

  return bored;
}
function isBored(n) {
  if (n === 0n) {
    return false;
  }
  let l = BigInt(n.toString().length);
  let parity = l % 2n;
  while (n > 0n) {
    if (n % 2n !== parity) {
      return false;
    }
    n = n / 10n;
    parity = 1n - parity;
  }
  return true;
}
