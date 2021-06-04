# Friends

## Solution code

See [solution source code](/Round%20H/Friends/solution.js)

## Analysis

You can see [solution analysis](/Round%20H/Friends/analysis.md) extracted from Google webpage.

## Problem

There are **N** people in the world numbered 1 to **N**. The i-th person has a distinct name **S<sub>i</sub>** that is a string of uppercase English letters.

Two people are friends if and only if there is some letter that appears at least once in each of their names. Any such letter does not need to be at the same position in both names. After all, friendship requires having something in common!

A friendship chain of length n between person A and person B is a sequence of people X<sub>1</sub>, X<sub>2</sub>, ..., X<sub>n</sub> such that X<sub>1</sub> = A, X<sub>n</sub> = B, and X<sub>i</sub> and X<sub>i+1</sub> are friends, for i=1 to n-1. Note that any two people can have zero or more friendship chains between them.

For each of the given **Q** pairs of people, can you find the length of the shortest friendship chain between them? If there is no friendship chain between a pair, output `-1`.

## Input

The first line of the input gives the number of test cases, **T**. **T** test cases follow. The first line of each test case contains the two integers **N** and **Q**. The second line contains N strings, which are people's names. The i-th string (starting from 1) is S<sub>i</sub>. Then, **Q** lines follow, describing the queries. The i-th of these lines contains the two integers X<sub>i</sub> and Y<sub>i</sub>, which are the indexes (counting starting from 1) of a pair of people in the list of names.

## Output

For each test case, output one line containing `Case #x: y`, where `x` is the test case number (starting from 1) and `y` is a list of the answers for the **Q** queries in order, separated by spaces.

## Limits

Time limit: 40 seconds per test set.<br>
Memory limit: 1GB.<br>
1 ≤ **T** ≤ 100.<br>
1 ≤ **Q** ≤ 5 × 10<sup>4</sup>.<br>
**S<sub>i</sub>** consists of uppercase English letters, for all i.<br>
1 ≤ length of **S<sub>i</sub>** ≤ 20, for all i.<br>
All **S<sub>i</sub>** are distinct.
1 ≤ **X<sub>i</sub>** < **Y<sub>i</sub>** ≤ **N**, for all i.

### Test set 1

2 ≤ **N** ≤ 100.

### Test set 2

10<sup>3</sup> < **N** ≤ 5 × 10<sup>4</sup> in at most 10 cases.<br>
2 ≤ **N** ≤ 10<sup>3</sup> in all other cases.

## Sample

| Input                           | Output         |
| ------------------------------- | -------------- |
| 2                               |                |
| 5 2                             | Case #1: 2 3   |
| LIZZIE KEVIN BOHDAN LALIT RUOYU |                |
| 1 2                             |                |
| 1 3                             |                |
| 2 2                             | Case #2: -1 -1 |
| KICK START                      |                |
| 1 2                             |                |
| 1 2                             |                |

In Sample Case #1, there are two queries:

- In the first query, `LIZZIE` and `KEVIN` are friends (because they share the letter E in their names). So, the shortest friendship chain length is 2.
- In the second query, `LIZZIE` and `BOHDAN` are not friends, but have two possible shortest friendship chains (either via `KEVIN` or `LALIT`). So, the shortest friendship chain length is 3. Note that there are other friendship chains as well, but they are longer.

In Sample Case #2, there are two queries:

- In the first query, `KICK` and `START` are not connected by a chain of friends.
- The second query is the same as the first query. Note that queries are not guaranteed to be distinct.
