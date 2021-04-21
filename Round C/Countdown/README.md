# Countdown

## Solution code

See [solution source code](/Round%20C/Countdown/solution.js)

## Analysis

You can see [solution analysis](/Round%20C/Countdown/analysis.md) extracted from Google webpage.

## Problem

Avery has an array of **N** positive integers. The i-th integer of the array is **A<sub>i</sub>**.

A contiguous subarray is an _m-countdown_ if it is of length m and contains the integers m, m-1, m-2, ..., 2, 1 in that order. For example, [`3, 2, 1`] is a 3-countdown.

Can you help Avery count the number of **K**-countdowns in her array?

## Input

The first line of the input gives the number of test cases, **T**. **T** test cases follow. Each test case begins with a line containing the integers **N** and **K**. The second line contains N integers. The i-th integer is **A<sub>i</sub>**.

## Output

For each test case, output one line containing `Case #x: y`, where `x` is the test case number (starting from 1) and `y` is the number of **K**-countdowns in her array.

## Limits

Time limit: 20 seconds per test set.<br>
Memory limit: 1 GB.<br>
1 ≤ **T** ≤ 100.<br>
2 ≤ **K** ≤ **N**.<br>
1 ≤ **A<sub>i</sub>** ≤ 2 × 10<sup>5</sup>, for all i.

### Test set 1

2 ≤ **N** ≤ 1000.

### Test set 2

2 ≤ **N** ≤ 2 × 10<sup>5</sup> for at most 10 test cases.<br>
For the remaining cases, 2 ≤ **N** ≤ 1000.

## Sample

| Input                   | Output     |
| ----------------------- | ---------- |
| 3                       |            |
| 12 3                    |            |
| 1 2 3 7 9 3 2 1 8 3 2 1 | Case #1: 2 |
| 4 2                     |            |
| 101 100 99 98           | Case #2: 0 |
| 9 6                     |            |
| 100 7 6 5 4 3 2 1 100   | Case #3: 1 |

In sample case #1, there are two 3-countdowns as highlighted below.

- 1 2 3 7 9 **3 2 1** 8 3 2 1
- 1 2 3 7 9 3 2 1 8 **3 2 1**

In sample case #2, there are no 2-countdowns.

In sample case #3, there is one 6-countdown as highlighted below.

- 100 7 **6 5 4 3 2 1** 100
