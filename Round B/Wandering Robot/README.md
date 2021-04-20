# Wandering Robot

## Solution code

See [solution source code](/Round%20B/Wandering%20Robot/solution.js)

## Analysis

You can see [solution analysis](/Round%20B/Wandering%20Robot/analysis.md) extracted from Google webpage.

## Problem

Jemma is competing in a robotics competition. The challenge for today is to build a robot that can navigate around a hole in the arena.

The arena is a grid of squares containing **W** columns (numbered 1 to **W** from left to right) and **H** rows (numbered 1 to **H** from top to bottom). The square in the x-th column and y-th row is denoted (x, y). The robot begins in the top left square (1,1) and must navigate to the bottom right square (**W**, **H**).

A rectangular subgrid of squares has been cut out of the grid. More specifically, all the squares that are in the rectangle with top-left square (**L**, **U**) and bottom-right square (**R**, **D**) have been removed.

Jemma did not have much time to program her robot, so it follows a very simple algorithm:
If the robot is in the rightmost column, it will always move to the square directly below it. Otherwise,
If the robot is in the bottommost row, it will always move to the square directly right of it. Otherwise,
The robot will randomly choose to either move to the square directly to the right, or to the square directly below it with equal probability.

Jemma passes the challenge if her robot avoids falling into the hole and makes it to the square (**W**, **H**). What is the probability she passes the challenge?

## Input

The first line of the input gives the number of test cases, **T**. **T** test cases follow. Each test case consists of a single line containing **W**, **H**, **L**, **U**, **R** and **D**.

## Output

For each test case, output one line containing `Case #x: y`, where `x` is the test case number (starting from 1) and `y` is a real number between 0 and 1 inclusive, the probability that Jemma passes the challenge.

`y` will be considered correct if it is within an absolute or relative error of 10<sup>-5</sup> of the correct answer. See the [FAQ](https://codejam.withgoogle.com/codejam/resources/faq#real-number-behavior) for an explanation of what that means, and what formats of real numbers we accept.

## Limits

Time limit: 15 seconds per test set.<br>
Memory limit: 1 GB.<br>
1 ≤ **T** ≤ 100.<br>
1 ≤ **U** ≤ **D** ≤ H.<br>
1 ≤ **L** ≤ **R** ≤ W.<br>
Neither the top-left nor bottom-right squares will be missing.<br>

### Test set 1

1 ≤ **W** ≤ 300.<br>
1 ≤ **H** ≤ 300.

### Test set 2

1 ≤ **W** ≤ 10<sup>5</sup>.<br>
1 ≤ **H** ≤ 10<sup>5</sup>.

## Sample

| Input        | Output          |
| ------------ | --------------- |
| 4            |                 |
| 3 3 2 2 2 2  | Case #1: 0.5    |
| 5 3 1 2 4 2  | Case #2: 0.0625 |
| 1 10 1 3 1 5 | Case #3: 0.0    |
| 6 4 1 3 3 4  | Case #4: 0.3125 |
