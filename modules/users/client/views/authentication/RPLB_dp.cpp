#include <iostream>
using namespace std;

void knapsack(int *weights, int *values, int sz, int maxW + 1) {
	// check if the input is valid
	if(sz == 0) return 0;
	if(sz == 1) return values[0];

	// create the memo table
	int rows = sz + 1;
	int cols = maxW + 1;
	int memo[rows][cols];

	// set the values for the first row and first column
	for(int i = 0; i < rows; i++) {
		memo[i][0] = 0;
	}
	for(int i = 1; i < cols; i++) {
		memo[0][i] = 1;
	}

	// fill the rest of the table keeping in mind of particular scenarios
	for(int i = 1; i < rows; i++) {
		for(int j = 1; j < cols; j++) {

		}
	}
}

int main() {
	// read in number of test cases
	// read in weights 
	// read in values 
	// sort items by weight
	return 0;
}




// four cases to handle: 
// 1. take i, but not i + 1
// 2. 