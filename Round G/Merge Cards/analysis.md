# Analysis

## Test Set 1

In the i-th round, Panko will have **N** - i choices. In total, there are (**N** - 1)! possibilities. Using an exhaustive approach, the expected value can be computed by definition.

## Test Set 2

After each round, the number on each card equals to the sum of a subarray of **A**. In the last round, there are **N** - 1 cases:

- **A<sub>1</sub>**, **A<sub>2</sub>** + **A<sub>3</sub>** + ... + **A<sub>N</sub>**
- **A<sub>1</sub>** + **A<sub>2</sub>**, **A<sub>3</sub>** + **A<sub>4</sub>** + ... + **A<sub>N</sub>**

  ⋮
- **A<sub>1</sub>** + **A<sub>2</sub>** + ... + **A<sub>i</sub>**, **A<sub>i + 1</sub>** + **A<sub>i</sub>** + 2 + ... + **A<sub>N</sub>**

  ⋮
- **A<sub>1</sub>** + **A<sub>2</sub>** + ... + **A<sub>N</sub>** - 1, **A<sub>N</sub>**

The last round contributes a fixed number, **A<sub>1</sub>** + **A<sub>2</sub>** + ... + **A<sub>N</sub>**, to the answer. But in each case, the part contributed by the previous rounds is actually the sum of the answers of two variants of the original problem:

- Replace A by **A<sub>1</sub>**, **A<sub>2</sub>**, ..., **A<sub>i</sub>**
- Replace A by **A<sub>i + 1</sub>**, **A<sub>2</sub>**, ..., **A<sub>N</sub>**

This part is then a weighted average of those **N** - 1 sums. However, each case is equally likely to occur. To reach a specific case in the last round, Panko has to avoid exactly one choice in each of the previous rounds. Thus arithmetic mean can be used here.

There are O(**N**<sup>2</sup>) different subproblems. The answer of each of subproblem can be computed in O(**N**) by [dynamic programming](https://en.wikipedia.org/wiki/Dynamic_programming). The overall time complexity is then O(**N**<sup>3</sup>).

## Test Set 3

The above solution can be optimized to achieve O(**N**<sup>2</sup>) time complexity by maintaining the prefix sums and suffix sums of the answers to the subproblems. But there is a faster approach that the O(**N**<sup>2</sup>) part is in precomputation instead of having O(**N**<sup>2</sup>) per test.

Let solve<sub>**N**</sub>(**A<sub>1</sub>**, **A<sub>2</sub>**, ..., **A<sub>N</sub>**) be a function that takes the **N** numbers written on the cards as parameters and returns the expected total score. It can be expressed as the average of **N** - 1 numbers. Each corresponds to a different choice in the first round. In particular, they are:

- **A<sub>1</sub>** + **A<sub>2</sub>** + solv<sub>**e**N - </sub>1(**A<sub>1</sub>** + **A<sub>2</sub>**, **A<sub>3</sub>**, ..., **A<sub>i</sub>**, **A<sub>i + 1</sub>**, ..., **A<sub>N</sub>** - 1, **A<sub>N</sub>**)
- **A<sub>2</sub>** + **A<sub>3</sub>** + solv<sub>**e**N - </sub>1(**A<sub>1</sub>**, **A<sub>2</sub>** + **A<sub>3</sub>**, ..., **A<sub>i</sub>**, **A<sub>i + 1</sub>**, ..., **A<sub>N</sub>** - 1, **A<sub>N</sub>**)

  ⋮
- **A<sub>i</sub>** + **A<sub>i + 1</sub>** + solve<sub>**N** - 1</sub>(**A<sub>1</sub>**, **A<sub>2</sub>**, **A<sub>3</sub>**, ..., **A<sub>i</sub>** + **A<sub>i + 1</sub>**, ..., **A<sub>N</sub>** - 1, **A<sub>N</sub>**)

  ⋮
- **A<sub>N</sub>** - 1 + **A<sub>N</sub>** + solv<sub>**e**N - </sub>1(**A<sub>1</sub>**, **A<sub>2</sub>**, **A<sub>3</sub>**, ..., **A<sub>i</sub>**, **A<sub>i + 1</sub>**, ..., **A<sub>N</sub>** - 1 + **A<sub>N</sub>**)

By using mathematical induction with solve2(**A<sub>1</sub>**, **A<sub>2</sub>**) = **A<sub>1</sub>** + **A<sub>2</sub>** as the base case, it can be shown that solv<sub>**e**</sub>N(**A<sub>1</sub>**, **A<sub>2</sub>**, ..., **A<sub>N</sub>**) is a linear combination of **A<sub>1</sub>**, **A<sub>2</sub>**, ..., **A<sub>N</sub>**, which means solv<sub>**e**</sub>N(**A<sub>1</sub>**, **A<sub>2</sub>**, ..., **A<sub>N</sub>**) = k<sub>**N**, 1</sub> × **A<sub>1</sub>** + k<sub>**N**, 2</sub> × **A<sub>2</sub>** + ... + k<sub>**N**, N</sub> × **A<sub>N</sub>** where k<sub>i, j</sub> are constants. If all k<sub>i, j</sub> are precomputed, the answer for each test can be computed in time complexity O(**N**).

Starting from k<sub>2, 1</sub> = k<sub>2, 2</sub> = 1, k<sub>i, j</sub> can be computed in increasing order of i. The transition formulas can be obtained by transforming the formula of solve<sub>**N**</sub>(**A<sub>1</sub>**, **A<sub>2</sub>**, ..., **A<sub>N</sub>**). For example, the transition formula of k<sub>**N**, 1</sub> can be obtained by replacing solve<sub>**N** - 1</sub>(...) and solve<sub>**N**</sub>(...) by the expressions with k<sub>i, j</sub>, then comparing the coefficients of the **A<sub>1</sub>** term.

The j-th card will become either (part of) the (j - 1)-th card or (part of) the j-th card after a round. Correspondingly, only the coefficients of the k<sub>i - 1, j - 1</sub> term, the k<sub>i - 1, j</sub> term and the constant term can be non-zero in the transition formula of k<sub>i, j</sub>. By grouping the like terms, the number of terms in each transition formula is reduced to at most 3. Then the overall time complexity becomes O(**N**<sup>2</sup>).

The error analysis is straightforward since **A<sub>i</sub>** cannot be negative. It should not be a problem in most of the implementations.
