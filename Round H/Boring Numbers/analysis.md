# Analysis

## Test Set 1

Simply check all the numbers from **L** to **R**. Complexity = O((**R-L**) × log<sub>10</sub>(**R**)).

## Test Set 2

We cannot follow the same approach as in Test Set 1 because the limits are too high. Let us calculate the number of boring numbers having exactly X digits first.

**Lemma 1**: There are 5 choices for digits at odd positions: {1,3,5,7,9}, and 5 choices for digits at even positions: {0,2,4,6,8}. Thus, the total number of boring numbers having exactly X digits is 5<sup>X</sup>.

Let us calculate the number of boring numbers less than or equal to **R**. The general idea is to split [1, **R**] into minimum number of intervals such that, all the numbers in an interval,

- Are of the same length.
- Have some(possibly none) prefix digits fixed.
  Positions following the fixed prefix can take any values from [0,9].
- Let length<sub>interval</sub> be the length of numbers in an interval. The intervals can thus be broken into two cases:

1. length<sub>interval</sub> < length of R
1. length<sub>interval</sub> = length of R

For example, let **R** = 3422. Number of boring numbers in [1, **R**] equals the number of boring numbers in [1,9] + [10, 99] + [100, 999] + [1000, 1999] + [2000, 2999] + [3000, 3099] + [3100, 3199] + [3200, 3299] + [3300, 3399] + [3400, 3409] + [3410, 3419] + [3420, 3422].

Case 1: This can be calculated using the fact that the total number of boring numbers having exactly X digits is 5<sup>X</sup>.

Case 2: Suppose **R** = d<sub>1</sub>,d<sub>2</sub>,d<sub>3</sub>,...,d<sub>len</sub>. Intervals can be calculated by fixing some prefix of digits such that all numbers in the interval are less than R. For example, all numbers of the form, d<sub></sub>,..., d<sub>i-1</sub>,a<sub>i</sub>,x<sub>i+1</sub>,x<sub>i+2</sub>,...,x<sub>len</sub>, where a<sub>i</sub> < d<sub>i</sub> and 0 ≤ x<sub>i+1</sub>,...,len ≤ 9.

If the fixed prefix does not obey the boring number's criteria, the number of boring number in the interval is 0. If it does, then, similar to Lemma 1, the number of boring numbers equals 5<sup>length of suffix</sup>.

Final answer = (number of boring numbers less than or equal to **R**) - (number of boring numbers less than or equal to **L** - 1).

Complexity = O(log<sub>10</sub>(**R**)).
