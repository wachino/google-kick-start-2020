# Analysis

There are 2 possible options to complete all the **N** levels. Let answer1 and answer2 be the time taken to complete all levels for each of the options respectively. Initialize answer1 and answer2 as 0.

## Test set 1

We have already reached the level **K**. In order to calculate time taken to reach level **K**, start iterating from level 1 till level **K** and increment answer1 and answer2 on each step as we take 1 unit time to complete each level.

- One of the options to complete all levels is to restart the game and complete all the levels again, starting from level 1. We can calculate the time taken for this option by iterating from level 1 till level **N** and incrementing answer1.
- The second possible option is to go back to level **S** and then complete remaining levels after picking up the sword at level **S**. We can calculate the time taken for this option by iterating from level K to level **S** and incrementing answer2 at each step. Now, start iterating from level **S** till level **N** and increment answer2 at each step.

The minimum time taken to complete all of the levels is the minimum value among answer1 and answer2. As we iterate each level at most twice in each possible option, the complexity of the solution is O(**N**).

## Test set 2

An observation here is that instead of simulating the levels and calculating the time taken, we can compute it in O(1) time. Initially, we are at level **K**. This means that we took **K** time units to reach level **K** as completing each level takes 1 unit of time. Hence, we can increment answer1 and answer2 by **K** directly.

- For the first option, we restart the game and complete all levels again. It would take **N** time units to complete all the levels again as total number of levels are **N**. Hence, answer1 = **N + K**.
- For the second option, we go back to level **S**. This would take **K - S** time units as there are **K - S** levels between level K and level S. Then we complete remaining levels after picking up sword at level S. This would take **N - S** time units. Hence answer2 = **K + K - S + N - S**.

The minimum time required to complete all levels is the minimum value among answer1 and answer2. Note that answer2 can overflow the range of range of 32-bit signed integers. For example, in C++ answer2 may overflow the range of INT datatype. Although the minimum answer would fit in the range of INT but overflowing of answer2 can cause unexpected output. Computing both answer1 and answer2 can be done in constant time. Hence, time complexity of the solution is O(1).
