# ATM Queue

## Solution code

See [solution source code](/Round%20F/ATM%20Queue/solution.js)

## Analysis

You can see [solution analysis](/Round%20F/ATM%20Queue/analysis.md) extracted from Google webpage.

## Problem

There are **N** people numbered from 1 to **N**, standing in a queue to withdraw money from an ATM. The queue is formed in ascending order of their number. The person numbered i wants to withdraw amount **A<sub>i**. The maximum amount a person can withdraw at a time is **X**. If they need more money than **X**, they need to go stand at the end of the queue and wait for their turn in line. A person leaves the queue once they have withdrawn the required amount.

You need to find the order in which all the people leave the queue.

## Input

The first line of the input gives the number of test cases **T**. **T** test cases follow.

The first line of each test case gives two space separated integers: the number of people standing in the queue, **N** and the maximum amount **X** that can be withdrawn in one turn.
The next line contains **N** space separated integers **A<sub>i</sub>**.

## Output

For each test case, output one line containing `Case #x: y`, where `x` is the test case number (starting from 1) and `y` is the space separated list of integers that denote the order in which the people leave the queue.

## Limits

Time limit: 20 seconds per test set.<br>
Memory limit: 1GB.<br>
1 ≤ **T** ≤ 100.

### Test set 1

1 ≤ **N** ≤ 100.
1 ≤ **A<sub>i</sub>** ≤ 100.
1 ≤ **X** ≤ 100.

### Test set 2

1 ≤ **N** ≤ 10<sup>5</sup> for at most 10 test cases. For the remaining cases, 1 ≤ **N** ≤ 100
1 ≤ **A<sub>i</sub>** ≤ 10<sup>9</sup>.
1 ≤ **X** ≤ 10<sup>9</sup>.

## Sample

| Input      | Output             |
| ---------- | ------------------ |
| 2          |                    |
| 3 3        | Case #1: 1 3 2     |
| 2 7 4      |                    |
| 5 6        | Case #2: 3 5 1 2 4 |
| 9 10 4 7 2 |                    |

In Sample Case #1, there are 3 people and the limit to withdraw in one turn is 3. Below is step-by-step description of how the process will look like:

1. The queue initially looks like [1, 2, 3]. The first person withdraws an amount of 2 in their first attempt and leaves the queue.
1. The queue now looks like [2, 3]. The second person wants to withdraw an amount of 7, but they can withdraw only 3 in their first turn. Since they still need to withdraw an amount of 4, they have to rejoin the queue at the end of the line.
1. The queue now looks like [3, 2]. The third person needs to withdraw an amount of 4 but they can only withdraw 3 in their first turn so, they rejoin the queue at the end of the line to withdraw amount of 1 later.
1. The queue now looks like [2, 3]. The second person still needs to withdraw an amount of 4. They withdraw an amount of 3 in their second turn and waits for their next turn to arrive to withdraw the remaining amount of 1.
1. The queue now looks like [3, 2]. The third person withdraws the remaining amount of 1 and leaves the queue.
1. The queue now looks like [2]. The second person withdraws the remaining amount of 1 and leaves the queue.
1. The queue is now empty.

The order in which people leave the queue is [1, 3, 2].

In Sample Case #2, there are 5 people and the limit to withdraw in one turn is 6. Below is step-by-step description of how the process will look like:

1. The queue initially looks like [1, 2, 3, 4, 5]. The first person withdraws an amount of 6, and joins at the end again to withdraw the remaining amount of 3 later.
1. The queue looks like [2, 3, 4, 5, 1]. The second person similarly withdraws an amount of 6 and waits for his next turn to withdraw an amount of 4.
1. The queue looks like [3, 4, 5, 1, 2]. The third person withdraws an amount of 4 and leaves the queue.
1. The queue now looks like [4, 5, 1, 2]. The fourth person withdraws 6 and waits for his next turn.
1. The queue looks like [5, 1, 2, 4]. The fifth person withdraws amount of 2 and leaves the queue.
1. The queue looks like, [1, 2, 4]. All other people now leave the queue after their second turn one by one.

The order in which people leave the queue is [3, 5, 1, 2, 4].
