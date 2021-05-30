#include <iostream>
#include <stack>
#include <vector>
#include <cmath>
#include <iomanip>

using namespace std;

long long int cards[5001];
long long int preSum[5001];

int main()
{
  int T, N;
  cin >> T;

  for (int t = 0; t < T; t++)
  {
    cin >> N;
    vector<vector<double>> dp(N, vector<double>(N, 0));
    vector<double> leftExpectedSum(N, 0);
    vector<double> rightExpectedSum(N, 0);

    for (int i = 0; i < N; i++)
    {
      cin >> cards[i];
      preSum[i] = cards[i];

      if (i > 0)
      {
        preSum[i] += preSum[i - 1];
      }
    }

    for (int l = 1; l < N; l++)
    {
      for (int i = 0; i < N - l; i++)
      {
        int j = i + l;
        double sum = leftExpectedSum[i] + rightExpectedSum[j];
        dp[i][j] = (double)(preSum[j] - (i > 0 ? preSum[i - 1] : 0LL)) + (sum / (double)(l));
        leftExpectedSum[i] += dp[i][j];
        rightExpectedSum[j] += dp[i][j];
      }
    }

    cout << "Case #" << t + 1 << ": " << setprecision(10) << fixed << dp[0][N - 1] << endl;
  }

  return 0;
}