# Beauty of tree

## Solution code

See [solution source code](/Round%20D/Beauty%20of%20tree/solution.js)
See [c++ solution source code](/Round%20D/Beauty%20of%20tree/solution.cpp)

## Analysis

You can see [solution analysis](/Round%20D/Beauty%20of%20tree/analysis.md) extracted from Google webpage.

## Problem

Amadea and Bilva are decorating a rooted tree containing **N** nodes, labelled from 1 to **N**. Node 1 is the root of the tree, and all other nodes have a node with a numerically smaller label as their parent.

Amadea and Bilva's decorate the tree as follows:

- Amadea picks a node of the tree uniformly at random and paints it. Then, she travels up the tree painting every **A**-th node until she reaches the root.
- Bilva picks a node of the tree uniformly at random and paints it. Then, she travels up the tree painting every **B**-th node until she reaches the root.

The _beauty_ of the tree is equal to the number of nodes painted at least once by either Amadea or Bilva. Note that even if they both paint a node, it only counts once.

What is the [expected](https://en.wikipedia.org/wiki/Expected_value) beauty of the tree?

## Input

The first line of the input gives the number of test cases, **T**. **T** test cases follow. Each test case begins with a line containing the three integers **N**, **A** and **B**. The second line contains **N**-1 integers. The i-th integer is the parent of node i+1.

## Output

For each test case, output one line containing `Case #x: y`, where `x` is the test case number (starting from 1) and `y` is the expected beauty of the tree.

`y` will be considered correct if it is within an absolute or relative error of 10<sup>-6</sup> of the correct answer. See the [FAQ](https://codejam.withgoogle.com/codejam/resources/faq#real-number-behavior) for an explanation of what that means, and what formats of real numbers we accept.

## Limits

Memory limit: 1 GB.<br>
1 ≤ **T** ≤ 100.<br>
1 ≤ **A** ≤ **N**.<br>
1 ≤ **B** ≤ **N**.

### Test set 1

Time limit: 20 seconds.<br>
1 ≤ **N** ≤ 100.

### Test set 2

Time limit: 40 seconds.<br>
For up to 5 cases, 1 ≤ **N** ≤ 5 × 10<sup>5</sup>.<br>
For all other cases, 1 ≤ **N** ≤ 100.

## Sample

| Input             | Output           |
| ----------------- | ---------------- |
| 3                 |                  |
| 8 2 3             |                  |
| 1 1 3 4 4 3 4     | Case #1: 2.65625 |
| 10 3 4            |                  |
| 1 1 1 1 1 1 1 1 1 | Case #2: 1.9     |
| 4 3 1             |                  |
| 1 2 3             | Case #3: 2.875   |

The trees for each sample case are shown in the diagram below.

![round-d-beauty-of-tree-ex-1](/images/round-d-beauty-of-tree-ex-1.svg)

A few example colourings for sample case #1 are shown below.

- If Amadea picks node 5 and Bilva picks node 8, then together they paint 4 unique nodes: Amadea paints nodes 5 and 3, while Bilva paints nodes 8 and 1.
- If Amadea picks node 7 and Bilva picks node 6, then together they paint 3 unique nodes: Amadea paints nodes 7 and 1, while Bilva paints nodes 6 and 1 (note that Amadea painted node 1 as well).

![round-d-beauty-of-tree-ex-1](/images/round-d-beauty-of-tree-ex-2.svg)
