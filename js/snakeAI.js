/**
  * Return the value corresponding to where to go
  *       0: up
  *       1: right
  *       2: down
  *       3: left
  *       0
  *     3   1
  *       2
  * currentDirection: The last direction moved
  * grid: A 2 dimensional grid corresponding to where things are
  * format is grid[row][col] - I THINK grid[0][0] is the top left of the grid.
  *       0: Empty space
  *       1: Edge of grid OR Snake (basically, somewhere we do not want to be).
  *       -1: Food
  * fRow: The row that the food is at
  * fCol: The column the food is at
  * hRow: The row where the head is at
  * hCol: The column where the head is at
  * snakeBody: A circular linked list of the snake body. Access information as follows:
  *       snakeBody.b0 --- Gets the first node of the list
  *       node.row ------- Gets the row of the block
  *       node.col ------- Gets the col of the block
  *       node.next ------ Gets the next element of the linked list
  *       Note:            Because this is a circular linked list, the last
  *                        node points to the starting node, not Null).
  */

function calculateMove(currentDirection, grid, fRow, fCol, hRow, hCol, snakeBody,snakeLength) {
  var result = astar(grid, hRow, hCol, fRow, fCol,snakeBody);
  if(result===-1){
		result=stackOff(currentDirection,grid, hRow, hCol, fRow, fCol,snakeLength,0);
	}
/*
	var convexHull = new ConvexHullGrahamScan();
	for (var x = 1; x < grid.length-1; x++) {
			for (var y = 1; y < grid[0].length-1; y++) {
				if (grid[x][y] == 1)
					convexHull.addPoint(x, y);
			}
	}
	var hull = convexHull.getHull();
	var output = "";
	for (var i = 0; i < hull.length; i++) {
		output += "(" + hull[i].x + "," + hull[i].y + "),";
	}
	console.log(output);
*/
	return result;
}
