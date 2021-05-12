#include <iostream>
#include <stack>
#include <vector>
#include <cmath>

using namespace std;

int N, Q;
int door[100001];
int interestingLeft[100001];
int interestingRight[100001];
int leftChild[100001];
int rightChild[100001];
int treeSize[100001];
int parent[100001];
vector<int> dp[100001];

int solveQuery(int S, int K)
{
  S--;
  K--;
  int x;
  bool isLeft = true;
  if (S > 0)
  {
    x = S - 1;
    isLeft = true;
  }
  if (S < N - 1 && (S == 0 || door[S] < door[S - 1]))
  {
    x = S;
    isLeft = false;
  }
  if (treeSize[x] >= K)
  {
    if (isLeft)
    {
      return S - K + 1;
    }
    else
    {
      return S + K + 1;
    }
  }
  int y = x;
  for (int h = log2(N - 1); h >= 0; h--)
  {
    if (dp[y].size() > h && dp[y][h] >= 0 && treeSize[dp[y][h]] < K)
    {
      y = dp[y][h];
    }
  }
  y = parent[y];
  if (x < y)
  {
    return y + K + 1 - ((y > -1 && leftChild[y] >= 0 ? treeSize[leftChild[y]] : 0));
  }
  else
  {
    return y + 2 - (K - ((y > -1 && rightChild[y] >= 0 ? treeSize[rightChild[y]] : 0)));
  }
}

void setSizes(int node)
{
  if (node < 0)
  {
    return;
  }
  setSizes(leftChild[node]);
  setSizes(rightChild[node]);
  treeSize[node] =
      1 +
      (leftChild[node] >= 0 ? treeSize[leftChild[node]] : 0) +
      (rightChild[node] >= 0 ? treeSize[rightChild[node]] : 0);
}
int main()
{
  int T, root, S, K;
  cin >> T;

  for (int t = 0; t < T; t++)
  {
    cin >> N >> Q;

    for (int i = 0; i < 100001; i++)
    {
      door[i] = -1;
      interestingLeft[i] = -1;
      interestingRight[i] = -1;
      leftChild[i] = -1;
      rightChild[i] = -1;
      parent[i] = -1;
      treeSize[i] = 0;
      dp[i].clear();
    }

    for (int i = 0; i < N - 1; i++)
    {
      cin >> door[i];
    }
    stack<int> st;

    for (int i = 0; i < N - 1; i++)
    {
      while (!st.empty() && door[st.top()] <= door[i])
      {
        st.pop();
      }
      if (!st.empty())
      {
        interestingLeft[i] = st.top();
      }
      st.push(i);
    }
    while (!st.empty())
    {
      st.pop();
    }
    for (int i = N - 2; i >= 0; i--)
    {
      while (!st.empty() && door[st.top()] <= door[i])
      {
        st.pop();
      }
      if (!st.empty())
      {
        interestingRight[i] = st.top();
      }
      st.push(i);
    }
    for (int i = 0; i < N - 1; i++)
    {
      if (
          interestingLeft[i] >= 0 &&
          (interestingRight[i] == -1 || door[interestingLeft[i]] < door[interestingRight[i]]))
      {
        parent[i] = interestingLeft[i];
        rightChild[interestingLeft[i]] = i;
      }
      else if (
          interestingRight[i] >= 0 &&
          (interestingLeft[i] == -1 || door[interestingRight[i]] < door[interestingLeft[i]]))
      {
        parent[i] = interestingRight[i];
        leftChild[interestingRight[i]] = i;
      }
      else
      {
        root = i;
      }
    }
    setSizes(root);
    int mylog = log2(N - 1);
    for (int i = 0; i < N - 1; i++)
    {
      dp[i].push_back(parent[i]);
    }
    for (int h = 1; h <= mylog; h++)
    {
      for (int i = 0; i < N - 1; i++)
      {
        dp[i].push_back(-1);
        if (dp[i][h - 1] >= 0)
        {
          dp[i][h] = (dp[dp[i][h - 1]][h - 1]);
        }
      }
    }
    cout << "Case #" << t + 1 << ":";
    for (int q = 0; q < Q; q++)
    {
      cin >> S >> K;
      cout << " " << solveQuery(S, K);
    }
    cout << endl;
  }

  return 0;
}