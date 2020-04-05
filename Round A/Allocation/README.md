# Allocation

## Solution code

See [solution source code](/Round%20A/Allocation/solution.js)

## Analysis

You can see [solution analysis](/Round%20A/Allocation/analysis.md) extracted from Google webpage.

## Problem

There are **N** houses for sale. The i-th house costs **A<sub>i</sub>** dollars to buy. You have a budget of **B** dollars to spend.

What is the maximum number of houses you can buy?

## Input

The first line of the input gives the number of test cases, **T**. **T** test cases follow. Each test case begins with a single line containing the two integers **N** and **B**. The second line contains N integers. The i-th integer is **A<sub>i</sub>**, the cost of the i-th house.

## Output

For each test case, output one line containing `Case #x: y`, where `x` is the test case number (starting from 1) and `y` is the maximum number of houses you can buy.

## Limits

Time limit: 15 seconds per test set.<br>
Memory limit: 1 GB.<br>
1 ≤ **T** ≤ 100.<br>
1 ≤ **B** ≤ 10<sup>5</sup>.<br>
1 ≤ **A<sub>i</sub>** ≤ 1000, for all i.<br>

### Test set 1

1 ≤ **N**≤ 100.

### Test set 2

1 ≤ **N** ≤ 10<sup>5</sup>.

## Sample

| Input       | Output     |
| ----------- | ---------- |
| 3           |            |
| 4 100       |            |
| 20 90 40 90 | Case #1: 2 |
| 4 50        |            |
| 30 30 10 10 | Case #2: 3 |
| 3 300       |            |
| 999 999 999 | Case #3: 0 |

In Sample Case #1, you have a budget of 100 dollars. You can buy the 1st and 3rd houses for 20 + 40 = 60 dollars.<br>
In Sample Case #2, you have a budget of 50 dollars. You can buy the 1st, 3rd and 4th houses for 30 + 10 + 10 = 50 dollars.<br>
In Sample Case #3, you have a budget of 300 dollars. You cannot buy any houses (so the answer is 0).<br>

**Note**: Unlike previous editions, in Kick Start 2020, all test sets are visible verdict test sets, meaning you receive instant feedback upon submission.
