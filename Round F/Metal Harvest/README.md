# Metal Harvest

## Solution code

See [solution source code](/Round%20F/Metal%20Harvest/solution.js)

## Analysis

You can see [solution analysis](/Round%20F/Metal%20Harvest/analysis.md) extracted from Google webpage.

## Problem

You are in charge of deploying robots to harvest Kickium from a nearby asteroid. Robots are not designed to work as a team, so only one robot can harvest at any point of time. A single robot can be deployed for up to **K** units of time in a row before it returns for calibration, regardless of how much time it spends on harvesting during that period. Harvesting can only be done during specific time intervals. These time intervals do not overlap. Given **K** and the time intervals in which harvesting is allowed, what is the minimum number of robot deployments required to harvest at all possible times?

## Input

The first line of the input gives the number of test cases, **T**. **T** test cases follow.

The first line of each test case gives two space separated integers **N** and **K**: the number of time intervals in which harvesting is allowed, and the maximum duration a robot can be deployed for before returning for calibration.
The next **N** lines contain a pair of space separated integers **S<sub>i</sub>** and **E<sub>i</sub>**: the start time and the end time of the i-th interval respectively. Please note that intervals don't include the time unit starting at the moment **E<sub>i</sub>**, so for example an interval with (**S<sub>i</sub>** = 2; **E<sub>i</sub>** = 5) has duration of 3 time units.

## Output

For each test case, output one line containing `Case #x: y`, where `x` is the test case number (starting from 1) and `y` is the number of times robot deployment is needed so that for each interval there is one robot harvesting at that time.

## Limits

1 ≤ **T** ≤ 100.<br>
Time limit: 20 seconds per test set.<br>
Memory limit: 1GB.<br>
All Si are distinct.<br>
For any two intervals (**S<sub>i</sub>**,**E<sub>i</sub>**) and (**S<sub>j</sub>**,**E<sub>j</sub>**) with **S<sub>i</sub>** < **S<sub>j</sub>**, **E<sub>i</sub>** < **S<sub>j</sub>**.

### Test set 1

1 ≤ **N** ≤ 100.<br>
1 ≤ **K** ≤ 100.<br>
1 ≤ **S<sub>i</sub>** < **E<sub>i</sub>** ≤ 200.

### Test set 2

100 < **N** ≤ 10<sup>5</sup>, in at most 10 test cases.
1 ≤ **N** ≤ 100, in the remaining test cases.
1 ≤ **K** ≤ 10<sup>9</sup>.
1 ≤ **S<sub>i</sub>** < **E<sub>i</sub>** ≤ 10<sup>9</sup>.

## Sample

| Input | Output     |
| ----- | ---------- |
| 2     |            |
| 3 5   | Case #1: 2 |
| 1 5   |            |
| 10 11 |            |
| 8 9   |            |
| 3 2   | Case #2: 3 |
| 1 2   |            |
| 3 5   |            |
| 13 14 |            |

In Sample Case #1, we deploy the robot at time instant 1 and it becomes available for the interval [1, 6]. However, it harvests only for the time range [1, 5]. After that we deploy the robot at 6 and it becomes available for the time interval [6, 11]. This deployment covers both the remaining intervals [8, 9] and [10, 11]. There are multiple optimal strategies here. For example, we can deploy the second robot at 7. It would then cover the range [7, 12], thus harvesting for the intervals [8, 9] and [10, 11].

In Sample Case #2, we deploy the robot at time instant 1, and it becomes available for [1, 3], but harvests for [1, 2] as [2, 3] is not part of any interval. After that we deploy the robot at 3 for the time range [3, 5] in which the robot harvests for the interval [3, 5]. The third deployment is done at time instant 13 making the robot available for time range [13, 15]. However, it harvests only for the interval [13, 14]. Thus three deployments are needed to cover all the intervals.
