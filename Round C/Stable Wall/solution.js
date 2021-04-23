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
    let [R, C] = readLine().split(' ').map(Number);
    let walls = [];
    let graph = {};
    let chars = {};
    let polyominos = [];
    for (let i = 0; i < R; i++) {
      walls.push(readLine());
    }
    walls.reverse();

    for (let i = 0; i < C; i++) {
      for (let j = 0; j < R; j++) {
        let c = walls[j][i];
        if (!graph[c]) {
          graph[c] = new Set();
        }
        if (!chars[c]) {
          chars[c] = true;
          polyominos.push(c);
        }
        if (j) {
          graph[walls[j - 1][i]].add(c);
        }
      }
    }
    let visited = {};
    let stack = [];

    for (let i = 0; i < polyominos.length; i++) {
      if (!visited[polyominos[i]]) {
        dfs(graph, polyominos[i], visited, stack);
      }
    }

    stack.reverse();
    let pos = {};
    for (let i = 0; i < stack.length; i++) {
      pos[stack[i]] = i;
    }

    console.log(`Case #${t + 1}: ${checkCycle(graph, polyominos, pos) ? '-1' : stack.join('')}`);
  }
}

function dfs(graph, u, visited, stack) {
  visited[u] = true;
  for (let it of graph[u]) {
    if (!visited[it]) dfs(graph, it, visited, stack);
  }
  stack.push(u);
}

function checkCycle(graph, polyominos, pos) {
  for (let i = 0; i < polyominos.length; i++) {
    for (let it of graph[polyominos[i]]) {
      if (pos[polyominos[i]] > pos[it]) {
        return true;
      }
    }
  }
  return false;
}
