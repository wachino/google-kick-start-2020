# Analysis

We need to take the buses in order from 1 to **N**. Let the buses be B<sub>1</sub>, B<sub>2</sub>, ...., B<sub>**N**</sub>. Also, let us define a good starting day to be any day Y in the range [1..**D**] such that it is possible to start the journey on day Y and take all buses in the order from 1 to **N** before the end of day **D**. Note that we do not require Y to be a multiple of **X<sub>1</sub>**, so there may be some waiting time involved in the beginning of the journey.

For a fixed day Y, let us see if it is a good starting day or not. The best strategy would be to take bus B1 as early as possible on or after day Y. This is because it would give us more days to take subsequent buses. Let us say we took bus B1 on day D1. Now the best strategy would be to take bus B2 as early as possible on or after day D1. Thus, if we took bus Bi on day D<sub>i</sub>, it would be optimal to take bus B<sub>i+1</sub> as early as possible on or after day D<sub>i</sub>.

Now we need to find out what is the earliest possible day for Bucket to take bus Bi on or after a particular day K. Since bus Bi only runs on days that are multiples of **X<sub>i</sub>**, we need to find the smallest multiple of **X<sub>i</sub>** greater than or equal to K. This can be calculated using the formula ⌈ K / **X<sub>i</sub>** ⌉ \* **X<sub>i</sub>**. Thus if bus Bi is taken on day D<sub>i</sub>, then it would be optimal to take bus B<sub>i+1</sub> on day D<sub>i+1</sub> = ⌈ D<sub>i</sub> / **X<sub>i+1</sub>** ⌉ \* **X<sub>i+1</sub>**. Thus, day Y is a good starting day if D<sub>**N**</sub> ≤ D, and this question can be answered in O(**N**) time.

## Test set 1

**D** can be at most 100, so we can find the latest good starting day by using the above approach for each day Y in the range [1..**D**]. The time complexity of this naive algorithm is O(D<sub>N</sub>).

## Test set 2

Now **D** can be at most 10<sup>12</sup>, so the naive algorithm would time out. Consider the largest good starting day P. Obviously, any day before P would be good as well because we can take the buses on the same days as if we started the journey on day P. Because of this observation, we can binary search on the range from 1 to **D** to find the largest good starting day P. The time complexity of the solution is O(**N** log **D**). Note that we can reduce the time complexity to O(**N** log(D/**X<sub>1</sub>**)) by restricting the search to multiples of **X<sub>1</sub>** only.

## Alternate solution

It is possible to solve the problem in linear time by working out the solution backwards. If we want to start our journey as late as possible, we should try to take the last bus B<sub>**N**</sub> as late a possible, namely, on day D<sub>N</sub>, which is the largest multiple of XN, less than or equal to day **D**. Similarly, in order to be on time for the last bus on day D<sub>N</sub>, we have to take bus B<sub>**N**-1</sub> no later than on day D<sub>N</sub>-1, which is the largest multiple of XN-1, less than or equal to D<sub>N</sub>. In general, bus Bi should be taken no later than on day D<sub>i</sub>, which is the largest multiple of **X<sub>i</sub>**, less than or equal to Di+1. The last calculated value D1 is the answer to the problem.

Note that the largest multiple of **X<sub>i</sub>** that occurs before a day L can be calculated in constant time as L - L mod **X<sub>i</sub>**. Therefore, the overall time complexity of this solution is O(**N**).
