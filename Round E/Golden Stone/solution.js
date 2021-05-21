{
  const top = 0,
    parent = (c) => ((c + 1) >>> 1) - 1,
    left = (c) => (c << 1) + 1,
    right = (c) => (c + 1) << 1;
  class PriorityQueue {
    constructor(c = (d, e) => d > e) {
      (this._heap = []), (this._comparator = c);
    }
    size() {
      return this._heap.length;
    }
    isEmpty() {
      return 0 == this.size();
    }
    peek() {
      return this._heap[top];
    }
    push(...c) {
      return (
        c.forEach((d) => {
          this._heap.push(d), this._siftUp();
        }),
        this.size()
      );
    }
    pop() {
      const c = this.peek(),
        d = this.size() - 1;
      return d > top && this._swap(top, d), this._heap.pop(), this._siftDown(), c;
    }
    replace(c) {
      const d = this.peek();
      return (this._heap[top] = c), this._siftDown(), d;
    }
    _greater(c, d) {
      return this._comparator(this._heap[c], this._heap[d]);
    }
    _swap(c, d) {
      [this._heap[c], this._heap[d]] = [this._heap[d], this._heap[c]];
    }
    _siftUp() {
      for (let c = this.size() - 1; c > top && this._greater(c, parent(c)); )
        this._swap(c, parent(c)), (c = parent(c));
    }
    _siftDown() {
      for (
        let d, c = top;
        (left(c) < this.size() && this._greater(left(c), c)) ||
        (right(c) < this.size() && this._greater(right(c), c));

      )
        (d = right(c) < this.size() && this._greater(right(c), left(c)) ? right(c) : left(c)),
          this._swap(c, d),
          (c = d);
    }
  }
  globalThis.PriorityQueue = PriorityQueue;
}

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
    let [N, M, S, R] = readLine().split(/\s+/).map(Number);
    let recipes = [];
    let queue = new PriorityQueue((a, b) => {
      return cost[a.j][a.s] < cost[b.j][b.s];
    });
    let cost = Array(N)
      .fill(null)
      .map(() =>
        Array(S)
          .fill(null)
          .map(() => -1)
      );
    let visited = Array(N)
      .fill(null)
      .map(() =>
        Array(S)
          .fill(null)
          .map(() => false)
      );
    let edges = Array(N)
      .fill(null)
      .map(() => []);

    for (let i = 0; i < M; i++) {
      let [U, V] = readLine().split(/\s+/).map(Number);
      edges[U - 1].push(V - 1);
      edges[V - 1].push(U - 1);
    }
    for (let i = 0; i < N; i++) {
      let stones = readLine().split(/\s+/).map(Number).slice(1);
      for (let j = 0; j < stones.length; j++) {
        cost[i][stones[j] - 1] = 0;
        queue.push({ j: i, s: stones[j] - 1 });
      }
    }
    for (let i = 0; i < R; i++) {
      let [ning, ...rec] = readLine().split(/\s+/).map(Number);
      recipes.push({
        ingredients: rec.slice(0, ning).map((a) => a - 1),
        result: rec[rec.length - 1] - 1,
      });
    }

    while (!queue.isEmpty()) {
      let u = queue.pop();
      if (visited[u.j][u.s]) {
        continue;
      }
      visited[u.j][u.s] = true;

      for (let i = 0; i < edges[u.j].length; i++) {
        let v = edges[u.j][i];
        if (cost[v][u.s] == -1 || cost[v][u.s] > cost[u.j][u.s] + 1) {
          cost[v][u.s] = cost[u.j][u.s] + 1;
          queue.push({ j: v, s: u.s });
        }
      }
      for (let r = 0; r < R; r++) {
        if (recipes[r].ingredients.includes(u.s)) {
          if (
            recipes[r].ingredients.every((ing) => cost[u.j][ing] !== -1) &&
            (cost[u.j][recipes[r].result] == -1 ||
              recipes[r].ingredients.reduce((acc, ing) => acc + cost[u.j][ing], 0) <
                cost[u.j][recipes[r].result])
          ) {
            cost[u.j][recipes[r].result] = recipes[r].ingredients.reduce(
              (acc, ing) => acc + cost[u.j][ing],
              0
            );
            queue.push({ j: u.j, s: recipes[r].result });
          }
        }
      }
    }
    let min = -1;

    for (let i = 0; i < N; i++) {
      if (cost[i][0] != -1 && cost[i][0] < 1e12 && (min == -1 || min > cost[i][0])) {
        min = cost[i][0];
      }
    }

    console.log(`Case #${t + 1}: ${min}`);
  }
}
