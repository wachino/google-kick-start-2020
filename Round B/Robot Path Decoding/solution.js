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
    let program = readLine();
    let par = Array(program.length).fill(null);
    let q = [];
    for (let i = 0; i < program.length; i++) {
      if (program[i] === '(') {
        q.push(i);
      } else if (program[i] === ')') {
        par[q.pop()] = i;
      }
    }
    let [x, y] = evaluateProgram(program, par, 0, program.length);
    console.log(`Case #${t + 1}: ${y + 1} ${x + 1}`);
  }
}

function evaluateProgram(program, par, left, right) {
  let mod = 1e9;
  let r = 0;
  let c = 0;
  for (let i = left; i < right; i++) {
    let n = program[i];
    if (n === 'S') {
      r = (r + 1) % mod;
    } else if (n === 'N') {
      r = (r + mod - 1) % mod;
    } else if (n === 'E') {
      c = (c + 1) % mod;
    } else if (n === 'W') {
      c = (c + mod - 1) % mod;
    } else if (/\d/.test(n)) {
      let m = Number(n);
      let [nr, nc] = evaluateProgram(program, par, i + 2, par[i + 1]);
      r = (((m * nr) % mod) + r) % mod;
      c = (((m * nc) % mod) + c) % mod;
      i = par[i + 1];
    }
  }
  return [r, c];
}
