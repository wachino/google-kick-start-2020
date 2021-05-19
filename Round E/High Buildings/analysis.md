# Analysis

Let the heights of buildings be **H<sub>1</sub>**, **H<sub>2</sub>**, **H<sub>3</sub>**, ... ,**H<sub>N</sub>**. If we look from the left side, it is possible to view a building `i`, iff **H<sub>i</sub>** ≥ **H<sub>j</sub>** for all `1 ≤ j ≤ i`. Similarly, if we look from the right side, it is possible to view a building `i`, iff **H<sub>i</sub>** ≥ **H<sub>j</sub>** for all `i ≤ j ≤ N`. It is possible to view a building i from both the sides if **H<sub>i</sub>** ≥ **H<sub>j</sub>** for all `i ≤ j ≤ N` and **H<sub>i</sub>** ≥ **H<sub>k</sub>** for all `1 ≤ k ≤ i`. This means that **H<sub>i</sub>** ≥ **H<sub>j</sub>** for all `1 ≤ j ≤ N`. Hence, only the buildings which have the maximum height would be visible from both sides.

The answer for **N** = 1 case is trivial. Consider the case where **A + B - C > N**. **A** buildings are seen from the left side, B buildings are visible from the right side and **C** buildings are visible from both sides. This means that **A + B - C** buildings will be visible from at least one of the sides. Hence, there are more than N buildings which are visible from at least one side, which is not possible. Thus, answer is `IMPOSSIBLE` in case **A + B - C > N**. The rest of the analysis assumes **N** > 1 and **A + B - C ≤ N**.

## Test Set 1

The height of each building is an integer between 1 to **N**, inclusive. Thus, each building can have at most **N** distinct values. So, if we consider all possible heights of the given buildings, we get **N<sup>N</sup>** different combinations. Now, we need to check if a possible set of heights satisfy the given condition of **A**, **B** and **C**.

To check how many buildings are visible from the left side, we start iterating from the left, and maintain a `prefix_max` variable that indicates what is the maximum height of a building which are on the left side of the current building. Formally, for building `i`, `prefix_max` would indicate maximum(**H<sub>j</sub>**) for `1 ≤ j < i`. And then we update the `prefix_max` variable when we move onto the next index. This can be done in O(**N**). Similarly, we can find how many buildings are visible from the right side by iterating from the right side, and maintaining a suffix maximum variable. This can be done in O(**N**). To count the number of buildings, which are visible from both sides, we need to find the maximum height and count the number of buildings with such maximum height. This can be done in O(**N**) too. If for a given set of heights, we get buildings visible from left side equal to **A**, buildings visible from right side equal to **B** and buildings visible from both the sides equal to **C**, we have found our answer. If there is no such set of heights that satisfy this condition, then we say that it is not possible.

A given set of height can be checked in O(**N**) time. There are **N<sup>N</sup>** different combinations. Thus the overall complexity of the solution is O(**N<sup>N</sup> × N**), which runs under the time limit for **N** ≤ 5.

## Test Set 2

In this test set, we cannot generate all possible set of heights as we have **N** ≤ 100. This can be solved by splitting into some cases:

- Case 1: Let us first assume that **C** > 1.
  Consider any 2 values P and Q such that 1 ≤ P < Q ≤ **N**. In this case, we can put **A - C** buildings with height P on the left and **B - C** buildings with height P on the right and **C** buildings in the middle with height Q. Now, we have satisfied the constraint of **A**, **B** and **C**. We have **N - A - B + C** buildings remaining which should not be visible from either side. This can be done by assigning them height P and hiding them between the buildings with height Q.

- Case 2: **C** = 1. In this case, we cannot hide buildings between buildings with the maximum height since there is only one of them. We would have to look for some cases here:

  - **A + B - C = N**,
    In this case, we have no buildings to hide, thus we can assign the buildings similar to Case 1 when **C** > 1 with heights P and Q.
  - Either **A** > 1 or **B** > 1. In this case, **A + B - C** < **N**. **A + B** is at least 3 and **C** = 1. Thus, we can say that **N** \> 2 holds. Consider any 3 values P, Q and R such that 1 ≤ P < Q < R ≤ **N**. In this case, we can put **A** - 1 buildings with height Q on the left, **B** - 1 buildings with height Q on the right side and a building with height R in the middle. Now, we have satisfied the constraint of **A**, **B** and **C**. We have **N - A - B + C** buildings remaining which should not be visible from either side. Let the height of remaining buildings be P. We have already placed at least 2 buildings, and all the buildings that we placed so far are higher than the buildings that we want to hide, so we can hide remaining buildings anywhere in between the already placed buildings.
  - **A** = 1 and **B** = 1
    This means that the building with maximum height is both on the leftmost point and rightmost point and it is not possible for **N** > 1. So, the answer is `IMPOSSIBLE` in this case.

Checking which case our solution falls under takes constant time. We can then just assign the heights to the buildings in linear time. Hence, the complexity of the solution is O(**N**).
