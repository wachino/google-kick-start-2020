# Analysis

First, note that Pommel can always win the game in a finite number of moves on expectation. To do so for a given input sequence **A<sub>1</sub>**, **A<sub>2</sub>**, ... **A<sub>K</sub>**, Pommel can simply reroll until the first **A<sub>1</sub>** dice land on 1, the next **A<sub>2</sub>** dice land on 2, and so on, with the last **A<sub>K</sub>** dice landing on **K**. Such an outcome satisfies the group arrangement required by the input; furthermore, on each roll, Pommel has a 1/**M** chance of rolling the needed value for the die she's on. This implies that Pommel is expected to win in **N**×**M** turns. Although this may not be optimal, it demonstrates that Pommel always has a winning strategy.

The basic procedure for calculating the expected value is the same for any approach. Suppose Pommel has already rolled and fixed some (potentially zero) dice. Furthermore, suppose she chooses a set S of dice configurations, such that she will not re-roll her current die if her dice configuration, after her current role, is in S. If there is a p<sub>i</sub> probability that her current dice configuration leads to the i-th element of S, then there is a 1 - Σ p<sub>i</sub> probability that Pommel will have to re-roll. If we now let e<sub>i</sub> equal the expected number of moves to win starting from state i, assuming Pommel plays optimally, we can solve for the expected number of moves to win starting from Pommel's current dice configuration. If we let this quantity be x:

<code>
x = 1 + (1 - Σ p<sub>i</sub>)x + Σ p<sub>i</sub>e<sub>i</sub>

x = (1 + Σ p<sub>i</sub>e<sub>i</sub>) / (Σ p<sub>i</sub>)
</code>

Approaches to the two tests sets differ in how they may enumerate the possible dice configurations and how they find the optimal set S for any given configuration.

## Test set 1

For this test set it's sufficient to look at all dice roll results directly. There are at most Σ0≤i≤**N**<sup>**M**<sup>**i**</sup></sup> < 60,000 such possibilities. For a given configuration, performing another roll leads to one of **M** new dice configurations, so for each configuration we can loop through all 2<sup>**M**</sup>-1 possible non-empty subsets of configurations that Pommel could choose to not re-roll on (ignoring subsets that contain configurations that make it impossible for Pommel to reach a winning configuration). For each choice of subset, we compute Pommel's expected turns until winning, and we take the subset with the lowest expected value.

We iterate over the dice configurations in descending order of number of locked dice: we start with the **N**-dice configurations, then do the **N**-1 dice configurations, and so on, until we get to the empty dice configuration. The expected value from the empty configuration is our answer. This algorithm runs in O(**M<sup>N</sup>**×2<sup>**M**</sup>×**M**) time which is sufficient.

As an example, consider the test case **N** = 3, **M** = 2, **K** = 2, **A<sub>1</sub>** = 1, **A<sub>2</sub>** = 2. Let's compute Pommel's expected turns from winning when she's rolled and locked down a 1. There are two possibilities for the dice configuration after her next turn: [1, 1] and [1, 2], each occurring with probability 1/2. By the time we process the configuration [1], we have already processed all two-roll configurations, so we know that on expectation, it takes two moves to win from [1, 1] and one move to win from [1, 2]. We now consider the three possibilities for S: {[1, 1]}, {[1, 2]}, and {[1, 1], [1, 2]}.

S = {[1, 1]} leads to the equation x = 1 + (1 - 0.5) x + 0.5 · 2, which results in x = 4.

S = {[1, 2]} leads to the equation x = 1 + (1 - 0.5) x + 0.5 · 1, which results in x = 3.

S = {[1, 1], [1, 2]} leads to the equation x = 1 + (1 - 0.5 - 0.5) x + 0.5 · 1 + 0.5 · 2, which results in x = 2.5. This is the lowest value, so we now know that if Pommel has rolled a single 1, she will win in 2.5 more turns on expectation if she plays optimally.

## Test set 2

For this test set, the number of possible dice roll outcomes, 50<sup>50</sup>, is far too large to be enumerated in time. We instead focus on the groupings of dice that could possibly lead to the desired configuration. For example, if Pommel rolls [1, 1, 2, 2] or if she rolls [3, 4, 3, 4], either way, she'll have two groups of two dice, which are equivalent for this problem. A dice grouping can be expressed as a **K**-tuple of integers (x<sub>1</sub>, x<sub>2</sub>, ..., x<sub>**K**</sub>) such that the tuple elements are non-decreasing: x<sub>i</sub> ≤ x<sub>i+1</sub> for 1 ≤ i < **K**. The i-th element of the tuple expresses the number of dice in the i-th smallest dice group, which is zero if there are fewer than **K** non-empty groups in the current dice configuration. For example, if **K**=3 and the dice results so far are [2, 2, 3, 2, 2, 3], the grouping can be expressed as (0, 2, 4).

We need to count how many possible **K**-tuples we need to consider to get an estimate of our algorithm's runtime. One simple bound is that we only need to consider a tuple T if the sum of T's elements is at most **K**. The total number of tuples we need to consider is therefore at most Σ<sub>0≤i≤**K**</sub>p(i) where p(i) is the number of **K**-tuples whose elements are non-decreasing and add to i. p(i) can be calculated with a script, but it is also the i-th partition number. The sum of the first 50 [partition numbers](<https://en.wikipedia.org/wiki/Partition_(number_theory)>) is only slightly more than a million, which is very tractable.

A dice roll could lead transition Pommel from a given configuration to at most **K** new configurations. We now need a way of computing the optimal subset of new configurations S to not re-roll that is faster than the naive O(**K** × 2<sup>**K**</sup>) approach. Consider the expected value equation shown above. First, note that if for some i, ei > x, removing configuration i from S will decrease the value of x. Similarly, if there is some configuration C with expected value E[C] < x that is not included in S, adding it to S will lower x. This implies that if some configuration C with expected value E[C] is in S, then all states C' with E[C'] < E[C] must also be in S if Pommel is playing optimally. We can therefore sort all configurations reachable from a given configuration so that they're in ascending order of expected turns until winning. It is guaranteed that the optimal S is a prefix of the sorted list, so it can be found by sorting and iterating over the list in O(**K** log **K**) time. However, in order to generate this list, we have to look up each new configuration's **K**-tuple in a hash map to get its respective ei. Hashing a **K**-tuple takes O(**K**) time, and we have up to **K** tuples to look up, so we can expect to spend O(**K**<sup>2</sup>) time computing the optimal expected value for each dice configuration.

This leads to an overall algorithm runtime of O(**K**<sup>2</sup> × (number of possible **K**-tuples)), which for our input sizes is on the order of 50 million.
