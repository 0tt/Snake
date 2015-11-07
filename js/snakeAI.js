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
  var numToDo = 0;
  var numHaveDone = 0;
  var lastFoodRow = -1;
  var lastFoodCol = 1;
  var minimumDistance = 10000000000;
	var foodDestination=true;
	var path_info={len:-1};
	var pathPosition=0;
function calculateMove(moveType,currentDirection, grid, fRow, fCol, hRow, hCol, snakeBody,snakeLength) {
  // var result = astar(grid, hRow, hCol, fRow, fCol,snakeBody);
	if (pathPosition >= path_info.len - 1) {
		pathPosition = 0;
		var butt = snakeBody.b0;
		while (butt.next != snakeBody.b0) {
			butt = butt.next;
		}
		var head_to_tail = astar(grid, hRow, hCol, butt.row, butt.col,snakeBody);
		console.log(head_to_tail);
		var head_to_food = astar(grid, hRow, hCol, fRow, fCol,snakeBody);
		console.log(head_to_food);
		var new_grid = [];
		for(var i=0;i<grid.length;i++) {
			new_grid[i]=[];
			for (var j = 0; j < grid[i].length; j++) {
					new_grid[i][j] = grid[i][j];
			}
		}
		for(var i=0;i<head_to_food.len;i++)
		{
			var point=head_to_food.pathOfTiles[i];
			new_grid[point.x][point.y]=1;
		}
		grid_str="";
		for(var i=0;i<new_grid.length;i++) {
			for (var j = 0; j < new_grid[i].length; j++) {
					grid_str+=new_grid[i][j];
			}
			grid_str+="\n";
		}
		console.log(grid_str);
		var food_to_tail = astar(new_grid, fRow, fCol, butt.row, butt.col,snakeBody);
		console.log(food_to_tail);
		if (head_to_food.pathOfDirs == null || food_to_tail.pathOfDirs == null) {
			path_info = head_to_tail;
		}
		else {
			var new_path = head_to_food.pathOfDirs.push(food_to_tail.pathOfDirs);
			var head_to_food_to_tail = {len:new_path.length,pathOfDirs:new_path};''
			path_info = head_to_food_to_tail;
		}
		console.log(path_info);
	}
	var dir= path_info.pathOfDirs[pathPosition];
	pathPosition++;
	return dir;
}
