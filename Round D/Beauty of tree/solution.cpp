#include <iostream>
#include <vector>
#include <iomanip>

using namespace std;

vector<int> children[500001];
int N, A, B;
int visitorsA[500001];
int visitorsB[500001];
int pathTaken[500001];
int pathSize = 0;

void computeProbabilitiesBT(int node = 0)
{
  pathTaken[pathSize++] = node;
  for (int i = 0; i < children[node].size(); i++)
  {
    computeProbabilitiesBT(children[node][i]);
  }
  visitorsA[pathTaken[pathSize - 1]]++;
  visitorsB[pathTaken[pathSize - 1]]++;
  if (A <= pathSize - 1)
  {
    visitorsA[pathTaken[pathSize - 1 - A]] += visitorsA[pathTaken[pathSize - 1]];
  }
  if (B <= pathSize - 1)
  {
    visitorsB[pathTaken[pathSize - 1 - B]] += visitorsB[pathTaken[pathSize - 1]];
  }
  pathSize--;
}

int main()
{
  int T, p;
  double probA;
  double probB;
  double ans;
  cin >> T;

  for (int t = 0; t < T; t++)
  {
    pathSize = 0;
    cin >> N >> A >> B;
    ans = 0.0;

    for (int i = 0; i < N; i++)
    {
      children[i].clear();
      visitorsA[i] = 0;
      visitorsB[i] = 0;
    }

    for (int i = 1; i < N; i++)
    {
      cin >> p;
      children[p - 1].push_back(i);
    }

    computeProbabilitiesBT();
    for (int i = 0; i < N; i++)
    {
      probA = double(visitorsA[i]) / double(N);
      probB = double(visitorsB[i]) / double(N);
      ans += probA + probB - probA * probB;
    }

    cout << "Case #" << t + 1 << ": " << fixed << setprecision(10) << ans << endl;
  }

  return 0;
}