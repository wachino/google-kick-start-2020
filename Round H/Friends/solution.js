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
    let [N, Q] = readLine().split(/\s+/).map(Number);
    let names = readLine().split(/\s+/);

    let dist = Array(26)
      .fill(null)
      .map(() => Array(26).fill(-1));
    for (let i = 0; i < 26; i++) {
      dist[i][i] = 0;
    }
    for (let i = 0; i < N; i++) {
      let p = names[i];
      for (let j = 0; j < p.length; j++) {
        for (let k = j + 1; k < p.length; k++) {
          if (p.charCodeAt(j) !== p.charCodeAt(k)) {
            dist[p.charCodeAt(j) - 'A'.charCodeAt(0)][p.charCodeAt(k) - 'A'.charCodeAt(0)] = 1;
            dist[p.charCodeAt(k) - 'A'.charCodeAt(0)][p.charCodeAt(j) - 'A'.charCodeAt(0)] = 1;
          }
        }
      }
    }
    for (let k = 0; k < 26; k++) {
      for (let i = 0; i < 26; i++) {
        for (let j = 0; j < 26; j++) {
          if (
            dist[i][k] !== -1 &&
            dist[k][j] !== -1 &&
            (dist[i][j] == -1 || dist[i][k] + dist[k][j] < dist[i][j])
          ) {
            dist[i][j] = dist[i][k] + dist[k][j];
          }
        }
      }
    }

    let ans = [];
    for (let i = 0; i < Q; i++) {
      let [x, y] = readLine().split(/\s+/).map(Number);
      x--;
      y--;
      ans.push(getDistance(dist, names[x], names[y]));
    }

    console.log(`Case #${t + 1}: ${ans.join(' ')}`);
  }
}

function getDistance(dist, a, b) {
  let min = -1;
  for (let i = 0; i < a.length; i++) {
    for (let j = 0; j < b.length; j++) {
      if (
        dist[a.charCodeAt(i) - 'A'.charCodeAt(0)][b.charCodeAt(j) - 'A'.charCodeAt(0)] !== -1 &&
        (min === -1 ||
          dist[a.charCodeAt(i) - 'A'.charCodeAt(0)][b.charCodeAt(j) - 'A'.charCodeAt(0)] < min)
      ) {
        min = dist[a.charCodeAt(i) - 'A'.charCodeAt(0)][b.charCodeAt(j) - 'A'.charCodeAt(0)];
      }
    }
  }

  return min === -1 ? min : min + 2;
}
