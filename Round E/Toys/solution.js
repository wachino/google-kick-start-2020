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
    let N = Number(readLine());
    let toys = Array(N).fill(null);
    let timeSum = 0n;
    let removed = 0;
    let minRemoved = 0;
    for (let i = 0; i < N; i++) {
      let [E, R] = readLine().split(/\s+/).map(BigInt);
      toys[i] = { E, R };
      timeSum += E;
    }
    let maxTime = timeSum;
    let curTime = timeSum;
    let playWith = new PriorityQueue((a, b) => {
      let c = a.R + a.E;
      let d = b.R + b.E;
      return c > d;
    });
    for (let i = 0; i < N; i++) {
      playWith.push(toys[i]);
      curTime += toys[i].E;
      while (!playWith.isEmpty() && playWith.peek().E + playWith.peek().R > timeSum) {
        let rt = playWith.pop();
        curTime -= 2n * rt.E;
        timeSum -= rt.E;
        removed++;
      }
      if (curTime > maxTime) {
        minRemoved = removed;
        maxTime = curTime;
      }
    }
    let inf = !playWith.isEmpty();
    if (inf) {
      minRemoved = removed;
    }
    console.log(`Case #${t + 1}: ${minRemoved} ${inf ? 'INDEFINITELY' : maxTime.toString()}`);
  }
}
