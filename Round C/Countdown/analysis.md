# Analysis

## Test Set 1

For each element **A<sub>i</sub>**, we can check whether it is a start of a **K**-countdown. In other words, we check whether **A<sub>i + j</sub>** = **K** - j for all 0 ≤ j ≤ **K**. If the element **A<sub>i</sub>** satisfies the condition, we can can increment 1 to our answer counter. This solution runs in O(**N** × **K**).

## Test Set 2

To solve this test set, we can loop through the elements and keep track of the number of consecutive elements such that the next element is one less than the previous element. We can do this by keeping a counter. If the current element is one less than the previous element, we increment this counter by 1. Otherwise, we reset the counter to 0. If the current element is 1 and our counter is at least **K** - 1, we know that the current element is the end of a **K**-countdown. We can increment 1 to our answer counter in this case.

This approach works since any pair of **K**-countdown subarrays does not overlap. This solution runs in O(**N**).

## Pseudocode

```
  answer_counter = 0
  decreasing_counter = 0
  for (i = 1 to N) {
    if (A[i] == A[i - 1] - 1) {
      decreasing_counter = decreasing_counter + 1
    } else {
      decreasing_counter = 0
    }
    if (A[i] == 1 and decreasing_counter >= K - 1) {
      answer_counter = answer_counter + 1
    }
  }
  print answer_counter
```
