# Analysis

Firstly, denote K<sub>i</sub> as the number of times a person will use the ATM. Formally, K<sub>i</sub> = ⌈**A<sub>i</sub>** / **X**⌉.

## Test Set 1

We can directly simulate the process using a queue.

Assume that i-th person, that wants to withdraw **A<sub>i</sub>**, is first in the queue. There are two possibilities:

- **A<sub>i</sub>** ≤ **X**. In that case, this person withdraws **A<sub>i</sub>** and leaves the queue. We can add i to the answer.
- **A<sub>i</sub>** > **X**. In that case, this person withdraws **X** (thus setting **A<sub>i</sub>** to **A<sub>i</sub>** - **X**) and goes back to the end of the queue.

Time complexity of this simulation is O(Σ K<sub>i</sub>).

In the worst case, when **X** = 1, K<sub>i</sub> = **A<sub>i</sub>**. Since **A<sub>i</sub>** ≤ 100, the worst time complexity is O(**N** × 100), which easily fits into the time limit.

## Test Set 2

In the second test set, K<sub>i</sub> can be as big as 10<sup>9</sup>, so direct simulation is too slow.

Let's look at two people i and j. When will i-th person leave the queue before j-th person? There are two cases:

- K<sub>i</sub> < K<sub>j</sub>. Since i-th person will use the ATM fewer times than j-th person, they will leave the queue earlier.
- K<sub>i</sub> = K<sub>j</sub> and i < j. If they both use the ATM the same amount of times, the person earlier in the queue in the initial configuration will leave first.

This observation is enough to form a full solution. Sort people first in ascending order of K<sub>i</sub>, and in case of ties in ascending order of their number. After sorting, this is our answer.

Time complexity of this solution is O(**N** log **N**).
