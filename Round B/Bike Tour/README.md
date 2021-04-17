# Bike Tour

## Solution code

See [solution source code](/Round%20B/Bike%20Tour/solution.js)

## Analysis

You can see [solution analysis](/Round%20B/Bike%20Tour/analysis.md) extracted from Google webpage.

## Problem

Li has planned a bike tour through the mountains of Switzerland. His tour consists of **N** checkpoints, numbered from 1 to **N** in the order he will visit them. The i-th checkpoint has a height of **H<sub>i</sub>**.

A checkpoint is a _peak_ if:

- It is not the 1st checkpoint or the **N**-th checkpoint, and
- The height of the checkpoint is _strictly_ greater than the checkpoint immediately before it and the checkpoint immediately after it.

Please help Li find out the number of peaks.

## Input

The first line of the input gives the number of test cases, **T**. **T** test cases follow. Each test case begins with a line containing the integer **N**. The second line contains **N** integers. The i-th integer is **H<sub>i</sub>**.

## Output

For each test case, output one line containing `Case #x: y`, where `x` is the test case number (starting from 1) and `y` is the number of peaks in Li's bike tour.

## Limits

Time limit: 10 seconds per test set.<br>
Memory limit: 1 GB.<br>
1 ≤ **T** ≤ 100.<br>
1 ≤ **H<sub>i</sub>** ≤ 100.

### Test set 1

3 ≤ **N** ≤ 5.

### Test set 2

3 ≤ **N** ≤ 100.

## Sample

| Input          | Output     |
| -------------- | ---------- |
| 4              |            |
| 3              |            |
| 10 20 14       | Case #1: 1 |
| 4              |            |
| 7 7 7 7        | Case #2: 0 |
| 5              |            |
| 10 90 20 90 10 | Case #3: 2 |
| 3              |            |
| 10 3 10        | Case #4: 0 |

- In sample case #1, the 2nd checkpoint is a peak.
- In sample case #2, there are no peaks.
- In sample case #3, the 2nd and 4th checkpoint are peaks.
- In sample case #4, there are no peaks.
