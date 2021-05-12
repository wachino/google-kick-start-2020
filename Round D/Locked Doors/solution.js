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
    let [N, Q] = readLine().split(' ').map(Number);
    let doors = readLine().split(' ').map(Number);
    let interestingLeft = Array(doors.length).fill(-1);
    let interestingRight = Array(doors.length).fill(-1);
    let stack = [];
    let tree = Array(doors.length)
      .fill(null)
      .map(() => ({ left: null, right: null, size: 0, door: -1, parent: -1 }));
    let root;
    for (let i = 0; i < doors.length; i++) {
      tree[i].door = doors[i];
      while (stack.length && doors[stack[stack.length - 1]] <= doors[i]) {
        stack.pop();
      }
      if (stack.length) {
        interestingLeft[i] = stack[stack.length - 1];
      }
      stack.push(i);
    }
    stack = [];
    for (let i = doors.length - 1; i >= 0; i--) {
      while (stack.length && doors[stack[stack.length - 1]] <= doors[i]) {
        stack.pop();
      }
      if (stack.length) {
        interestingRight[i] = stack[stack.length - 1];
      }
      stack.push(i);
    }

    for (let i = 0; i < doors.length; i++) {
      let j;
      if (
        interestingLeft[i] >= 0 &&
        (interestingRight[i] == -1 || doors[interestingLeft[i]] < doors[interestingRight[i]])
      ) {
        tree[i].parent = interestingLeft[i];
        tree[interestingLeft[i]].right = i;
      } else if (
        interestingRight[i] >= 0 &&
        (interestingLeft[i] == -1 || doors[interestingRight[i]] < doors[interestingLeft[i]])
      ) {
        tree[i].parent = interestingRight[i];
        tree[interestingRight[i]].left = i;
      } else {
        root = i;
      }
    }
    setSizes(tree, root);

    let dp = lifting(tree);
    let ans = [];
    for (let q = 0; q < Q; q++) {
      let [s, k] = readLine().split(/\s+/).map(Number);
      ans.push(solveQuery(tree, dp, s, k));
    }
    console.log(`Case #${t + 1}: ${ans.join(' ')}`);
  }
}

function solveQuery(tree, dp, s, k) {
  s--;
  k--;
  let x;
  let isLeft = true;
  if (s > 0) {
    x = s - 1;
    isLeft = true;
  }
  if (s < tree.length && (s == 0 || tree[s].door < tree[s - 1].door)) {
    x = s;
    isLeft = false;
  }
  if (tree[x].size >= k) {
    if (isLeft) {
      return s - k + 1;
    } else {
      return s + k + 1;
    }
  }
  let y = x;

  for (let h = Math.floor(Math.log2(tree.length)); h >= 0; h--) {
    if (dp[y][h] > -1 && tree[dp[y][h]].size < k) {
      y = dp[y][h];
    }
  }
  y = tree[y].parent;

  if (x < y) {
    return y + k + 1 - ((y > -1 && tree[y].left !== null && tree[tree[y].left].size) || 0);
  } else {
    return y + 2 - (k - ((y > -1 && tree[y].right !== null && tree[tree[y].right].size) || 0));
  }
}
function lifting(tree) {
  let log = Math.floor(Math.log2(tree.length));
  let dp = Array(tree.length)
    .fill(null)
    .map(() => Array(log + 1).fill(-1));
  for (let i = 0; i < tree.length; i++) {
    dp[i][0] = tree[i].parent;
  }

  for (let h = 1; h <= log; h++) {
    for (let i = 0; i < dp.length; i++) {
      if (dp[i][h - 1] > -1) {
        dp[i][h] = dp[dp[i][h - 1]][h - 1];
      }
    }
  }
  return dp;
}

function setSizes(tree, node) {
  if (node === null) return;
  setSizes(tree, tree[node].left);
  setSizes(tree, tree[node].right);
  tree[node].size =
    1 +
    ((tree[node].left !== null && tree[tree[node].left].size) || 0) +
    ((tree[node].right !== null && tree[tree[node].right].size) || 0);
}
