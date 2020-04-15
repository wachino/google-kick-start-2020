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
    let [n, k, p] = readLine()
      .split(' ')
      .map(Number);
    let plates = [];
    for (let i = 0; i < n; i++) {
      plates.push(
        readLine()
          .split(' ')
          .map(Number)
      );
    }

    let dp = Array(p + 1)
      .fill(false)
      .map(() => plates.map(() => -1));

    function getDp(nplates, nstack) {
      if (nplates < 0 || nplates > (nstack + 1) * k) {
        return -1;
      }
      if (nstack < 0 || nplates <= 0) {
        return 0;
      }
      if (dp[nplates][nstack] === -1) {
        let maxForStack = 0;
        let accum = 0;
        let tmp;
        for (let i = 0; i <= k; i++) {
          accum += i > 0 ? plates[nstack][i - 1] : 0;
          tmp = getDp(nplates - i, nstack - 1);
          if (tmp >= 0 && tmp + accum > maxForStack) {
            maxForStack = tmp + accum;
          }
        }
        dp[nplates][nstack] = maxForStack;
      }
      return dp[nplates][nstack];
    }

    console.log(`Case #${t + 1}: ${getDp(p, n - 1)}`);
  }
}
