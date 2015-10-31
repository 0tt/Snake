/**
 * Find how many open spots there are on the longest path
 */

function floodFill(grid, row, col, snakeLength) {
	// Mark as visited
	if (snakeLength <= 0) {
		return 0;
	}
	var previousVal = grid[row][col];
	grid[row][col] = 2;
	var longest = 0;
	if (row-1 >= 0 && grid[row-1][col] <= 0) {
		var l = floodFill(grid, row-1, col, snakeLength-1);
		if (l > longest) {
			longest = l;
		}
	}
	if (longest >= snakeLength) {
		grid[row][col] = previousVal;
		return longest;
	}
	if (row+1 < grid.length && grid[row+1][col] <= 0) {
		var l = floodFill(grid, row+1, col, snakeLength-1);
		if (l > longest) {
			longest = l;
		}

	}
	if (longest >= snakeLength) {
		grid[row][col] = previousVal;
		return longest;
	}
	if (col-1 >= 0 && grid[row][col-1] <= 0) {
		var l = floodFill(grid, row, col-1, snakeLength-1);
		if (l > longest) {
			longest = l;
		}

	}
	if (longest >= snakeLength) {
		grid[row][col] = previousVal;
		return longest;
	}
	if (col+1 < grid[0].length && grid[row][col+1] <= 0) {
		var l = floodFill(grid, row, col+1, snakeLength-1);
		if (l > longest) {
			longest = l;
		}
	}
	grid[row][col] = previousVal;
	return longest+1;
}
