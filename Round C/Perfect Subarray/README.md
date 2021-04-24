# Perfect Subarray

## Solution code

See [solution source code](/Round%20C/Perfect%20Subarray/solution.js)

## Analysis

You can see [solution analysis](/Round%20C/Perfect%20Subarray/analysis.md) extracted from Google webpage.

## Problem

Cristobal has an array of **N** (possibly negative) integers. The i-th integer in his array is **A<sub>i</sub>**. A contiguous non-empty subarray of Cristobal's array is _perfect_ if its total sum is a [perfect square](https://en.wikipedia.org/wiki/Square_number). A perfect square is a number that is the product of a non-negative integer with itself. For example, the first five perfect squares are 0, 1, 4, 9 and 16.

How many subarrays are _perfect_? Two subarrays are different if they start or end at different indices in the array, even if the subarrays contain the same values in the same order.

## Input

The first line of the input gives the number of test cases, **T**. **T** test cases follow. The first line of each test case contains the integer **N**. The second line contains **N** integers describing Cristobal's array. The i-th integer is **A<sub>i</sub>**.

## Output

For each test case, output one line containing `Case #x: y`, where `x` is the test case number (starting from 1) and `y` is the number of perfect subarrays.

## Limits

Memory limit: 1 GB.<br>
1 ≤ **T** ≤ 100.<br>
-100 ≤ **A<sub>i</sub>** ≤ 100, for all i.<br>

### Test set 1

Time limit: 20 seconds.<br>
1 ≤ **N** ≤ 1000.

### Test set 2

Time limit: 30 seconds.<br>
For up to 5 cases, 1 ≤ **N** ≤ 10<sup>5</sup>.<br>
For the remaining cases, 1 ≤ **N** ≤ 1000.

## Sample

| Input        | Output     |
| ------------ | ---------- |
| 3            |            |
| 3            |            |
| 2 2 6        | Case #1: 1 |
| 5            |            |
| 30 30 9 1 30 | Case #2: 3 |
| 4            |            |
| 4 0 0 16     | Case #3: 9 |

In sample case #1, there is one perfect subarray: [`2 2`] whose sum is 2<sup>2</sup>.

In sample case #2, there are three perfect subarrays:

- [`9`], whose total sum is 3<sup>2</sup>.
- [`1`], whose total sum is 1<sup>2</sup>.
- [`30 30 9 1 30`], whose total sum is 10<sup>2</sup>.

In sample case #3, there are nine perfect subarrays:

- [`4`], whose total sum is 2<sup>2</sup>.
- [`4 0`], whose total sum is 2<sup>2</sup>.
- [`4 0 0`], whose total sum is 2<sup>2</sup>.
- [`0`], whose total sum is 0<sup>2</sup>.
- [`0 0`], whose total sum is 0<sup>2</sup>.
- [`0 0 16`], whose total sum is 4<sup>2</sup>.
- [`0`], whose total sum is 0<sup>2</sup>.
- [`0 16`], whose total sum is 4<sup>2</sup>.
- [`16`], whose total sum is 4<sup>2</sup>.

**Note**: We do not recommend using interpreted/slower languages for the test set 2 of this problem.
