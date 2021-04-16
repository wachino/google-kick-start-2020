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
    let strs = [];
    for (let i = 0; i < N; i++) {
      strs.push(readLine());
    }
    let prefixes = [];
    let trie = {};
    for (let i = 0; i < N; i++) {
      let w = strs[i];
      let curr = trie;
      for (let j = 0; j < w.length; j++) {
        let c = w[j];
        if (!curr[c]) {
          curr[c] = {
            count: 0,
          };
          prefixes.push(curr[c]);
        }
        curr[c].count++;
        curr = curr[c];
      }
    }
    let ans = 0;
    for (let i = 0; i < prefixes.length; i++) {
      ans += Math.floor(prefixes[i].count / K);
    }
    console.log(`Case #${t + 1}: ${ans}`);
  }
}
