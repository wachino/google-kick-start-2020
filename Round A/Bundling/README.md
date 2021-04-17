# Bundling

## Solution code

See [solution source code](/Round%20A/Bundling/solution.js)

## Analysis

You can see [solution analysis](/Round%20A/Bundling/analysis.md) extracted from Google webpage.

## Problem

Pip has **N** strings. Each string consists only of letters from `A` to `Z`. Pip would like to bundle their strings into _groups_ of size . Each string must belong to exactly one group.

The _score_ of a group is equal to the length of the longest prefix shared by all the strings in that group. For example:

- The group {`RAINBOW`, `RANK`, `RANDOM`, `RANK`} has a score of 2 (the longest prefix is '`RA`').
- The group {`FIRE`, `FIREBALL`, `FIREFIGHTER`} has a score of 4 (the longest prefix is '`FIRE`').
- The group {`ALLOCATION`, `PLATE`, `WORKOUT`, `BUNDLING`} has a score of 0 (the longest prefix is '').

Please help Pip bundle their strings into groups of size **K**, such that the sum of scores of the groups is maximized.

## Input

The first line of the input gives the number of test cases, **T**. **T** test cases follow. Each test case begins with a line containing the two integers **N** and **K**. Then, **N** lines follow, each containing one of Pip's strings.

## Output

For each test case, output one line containing `Case #x: y`, where `x` is the test case number (starting from 1) and `y` is the maximum sum of scores possible.

## Limits

Time limit: 20 seconds per test set.<br>
Memory limit: 1 GB.<br>
1 ≤ **T** ≤ 100.<br>
2 ≤ **N** ≤ 10<sup>5</sup>.<br>
2 ≤ **K** ≤ **N**.<br>
**K** divides **N**.<br>
Each of Pip's strings contain at least one character.<br>
Each string consists only of letters from `A` to `Z`.<br>

### Test set 1

Each of Pip's strings contain at most 5 characters.

### Test set 2

The total number of characters in Pip's strings across all test cases is at most 2 × 10<sup>6</sup>.

## Sample

| Input 1 | Output 1    |
| ------- | ----------- |
| 2       |             |
| 2 2     |             |
| KICK    |             |
| START   | Case #1: 0  |
| 8 2     |             |
| G       |             |
| G       |             |
| GO      |             |
| GO      |             |
| GOO     |             |
| GOO     |             |
| GOOO    |             |
| GOOO    | Case #2: 10 |

<br>

| Input 2     | Output 2   |
| ----------- | ---------- |
| 1           |            |
| 6 3         |            |
| RAINBOW     |            |
| FIREBALL    |            |
| RANK        |            |
| RANDOM      |            |
| FIREWALL    |            |
| FIREFIGHTER | Case #1: 6 |

### Sample #1

In Case #1, Pip can achieve a total score of 0 by make the groups:

- {`KICK`, `START`}, with a score of 0.

In Case #2, Pip can achieve a total score of 10 by make the groups:

- {`G`, `G`}, with a score of 1.
- {`GO`, `GO`}, with a score of 2.
- {`GOO`, `GOO`}, with a score of 3.
- {`GOOO`, `GOOO`}, with a score of 4.

### Sample #2

In Case #1, Pip can achieve a total score of 6 by make the groups:

- {`RAINBOW`, `RANK`, `RANDOM`}, with a score of 2.
- {`FIREBALL`, `FIREWALL`, `FIREFIGHTER`}, with a score of 4.

- **Note #1**: Only Sample #1 is a valid input for Test set 1. Consequently, Sample #1 will be used as a sample test set for your submissions.
- **Note #2**: Unlike previous editions, in Kick Start 2020, all test sets are visible verdict test sets, meaning you receive instant feedback upon submission.
