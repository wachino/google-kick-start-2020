var os = require('os');
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
    .split(os.EOL)
    .map((str) => str.trim());
  solution();
});

function readLine() {
  return inputString[currentLine++];
}
function solution() {
  const T = Number(readLine());
  for (let t = 0; t < T; t++) {
    let [N, A, B] = readLine()
      .trim()
      .split(' ')
      .filter(Boolean)
      .map((s) => Number(s.trim()));
    let parents = readLine().trim().split(' ').filter(Boolean).map(Number);
    let tree = Array(N)
      .fill(null)
      .map(() => ({
        visitsA: 0,
        visitsB: 0,
        children: [],
      }));
    let ans = 0;
    if (parents.length !== N - 1) throw 'Error';
    for (let i = 0; i < parents.length; i++) {
      tree[parents[i] - 1].children.push(i + 1);
    }

    computeProbabilities(tree, A, B, N);

    ans = tree.reduce((acc, node) => {
      let probA = node.visitsA / N;
      let probB = node.visitsB / N;
      return acc + probA + probB - probA * probB;
    }, 0);

    console.log(`Case #${t + 1}: ${ans}`);
  }
}

function computeProbabilities(tree, A, B, N) {
  let pathTaken = [{ id: 0, last: 0 }];

  while (pathTaken.length) {
    let node = pathTaken[pathTaken.length - 1];
    while (node.last < tree[node.id].children.length) {
      pathTaken.push({ id: tree[node.id].children[node.last], last: 0 });
      node.last++;
      node = pathTaken[pathTaken.length - 1];
    }
    tree[pathTaken[pathTaken.length - 1].id].visitsA++;
    tree[pathTaken[pathTaken.length - 1].id].visitsB++;
    if (A <= pathTaken.length - 1) {
      tree[pathTaken[pathTaken.length - 1 - A].id].visitsA +=
        tree[pathTaken[pathTaken.length - 1].id].visitsA;
    }
    if (B <= pathTaken.length - 1) {
      tree[pathTaken[pathTaken.length - 1 - B].id].visitsB +=
        tree[pathTaken[pathTaken.length - 1].id].visitsB;
    }
    pathTaken.pop();
  }
}
