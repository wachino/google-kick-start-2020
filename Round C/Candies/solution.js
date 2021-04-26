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
    let arr = readLine().split(' ').map(Number);
    let sumTree = Array(2 * N).fill(0);
    let lazySumTree = Array(2 * N).fill(0);
    buildSegmentTree(
      sumTree,
      arr.map((e, i) => (i % 2 ? -1 : 1) * e),
      0,
      N - 1,
      0
    );

    let mulTree = Array(2 * N).fill(0);
    let lazyMulTree = Array(2 * N).fill(0);
    buildSegmentTree(
      mulTree,
      arr.map((e, i) => (i % 2 ? -1 : 1) * e * (i + 1)),
      0,
      N - 1,
      0
    );
    let ans = 0;
    for (let i = 0; i < Q; i++) {
      let [op, x, v] = readLine().split(' ');
      x = Number(x);
      v = Number(v);
      if (op === 'U') {
        let old = query(sumTree, lazySumTree, 0, N - 1, x - 1, x - 1, 0);
        let newValue = v * (-1) ** (x - 1);
        update(sumTree, lazySumTree, newValue - old, 0, N - 1, x - 1, x - 1, 0);
        update(mulTree, lazyMulTree, newValue * x - old * x, 0, N - 1, x - 1, x - 1, 0);
      } else if (op === 'Q') {
        let mts = query(mulTree, lazyMulTree, 0, N - 1, x - 1, v - 1, 0);
        let ts = (x - 1) * query(sumTree, lazySumTree, 0, N - 1, x - 1, v - 1, 0);
        ans += (mts - ts) * (-1) ** (x - 1);
      } else {
        throw 'error';
      }
    }

    console.log(`Case #${t + 1}: ${ans}`);
  }
}

function update(segmentTree, lazyTree, addValue, start, end, left, right, node) {
  if (left <= start && end <= right) {
    segmentTree[node] += addValue;
    lazyTree[node] += addValue;
    return;
  }
  pushDown(segmentTree, lazyTree, node);
  let mid = (start + end) >> 1;
  let leftChildNode = (node << 1) | 1;
  let rightChildNode = (node + 1) << 1;
  if (left <= mid) update(segmentTree, lazyTree, addValue, start, mid, left, right, leftChildNode);
  if (right > mid)
    update(segmentTree, lazyTree, addValue, mid + 1, end, left, right, rightChildNode);

  pushUp(segmentTree, node);
}

function buildSegmentTree(segmentTree, arr, start, end, node) {
  if (start === end) {
    segmentTree[node] = arr[start];
  } else {
    let mid = (start + end) >> 1;
    let leftChildNode = (node << 1) | 1;
    let rightChildNode = (node + 1) << 1;
    buildSegmentTree(segmentTree, arr, start, mid, leftChildNode);
    buildSegmentTree(segmentTree, arr, mid + 1, end, rightChildNode);
    segmentTree[node] = segmentTree[leftChildNode] + segmentTree[rightChildNode];
  }
}

function query(segmentTree, lazyTree, start, end, left, right, node) {
  if (right < start || end < left) {
    return 0;
  }
  if (left <= start && end <= right) {
    return segmentTree[node];
  }
  let mid = (start + end) >> 1;
  pushDown(segmentTree, lazyTree, node);
  let leftChildNode = (node << 1) | 1;
  let rightChildNode = (node + 1) << 1;
  return (
    query(segmentTree, lazyTree, start, mid, left, right, leftChildNode) +
    query(segmentTree, lazyTree, mid + 1, end, left, right, rightChildNode)
  );
}

function pushDown(segmentTree, lazyTree, node) {
  if (lazyTree[node]) {
    let leftChildNode = (node << 1) | 1;
    let rightChildNode = (node + 1) << 1;

    segmentTree[leftChildNode] += lazyTree[node];
    segmentTree[rightChildNode] += lazyTree[node];
    lazyTree[leftChildNode] += lazyTree[node];
    lazyTree[rightChildNode] += lazyTree[node];
    lazyTree[node] = 0;
  }
}

function pushUp(segmentTree, node) {
  let leftChildNode = (node << 1) | 1;
  let rightChildNode = (node + 1) << 1;

  segmentTree[node] = segmentTree[leftChildNode] + segmentTree[rightChildNode];
}
