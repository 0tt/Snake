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
var path_info={len:-1};
var pathPosition=0;
var grid_str="";
function calculateMove(moveType,currentDirection, grid, fRow, fCol, hRow, hCol, snakeBody,snakeLength, snakeTail, globalSnakeLinkedList) {
  if (pathPosition >= path_info.len) {
    console.log(globalSnakeLinkedList);
  	pathPosition = 0;
  	var butt = globalSnakeLinkedList.tail;
    // var butt = snakeBody["b" + (snakeLength-1)];
  	// while (butt.next != snakeBody.b0) {
  	// 	butt = butt.next;
  	// }
  	console.log(butt.row)
  	console.log(butt.col);
  	var new_grid = [];
  	for(var i=0;i<grid.length;i++) {
  		new_grid[i]=[];
  		for (var j = 0; j < grid[i].length; j++) {
  			if(i==butt.row&&j==butt.col){
  				new_grid[i][j] = -2;
  			}else{
  				new_grid[i][j] = grid[i][j];
  			}
  		}
  	}
    grid_str="";
    for(var i=0;i<new_grid.length;i++) {
      for (var j = 0; j < new_grid[i].length; j++) {
        grid_str+=new_grid[i][j];
      }
      grid_str+="\n";
    }
    console.log("=====BEFORE====");
    console.log(grid_str);
    console.log("===============");
  	/*
  	var head_to_tail = astar(new_grid, hRow, hCol, butt.row, butt.col,snakeBody);
  	if(head_to_tail.pathOfDirs==null){
  		console.log("Couldn't find head to tail path");
  	}
  	//*/
  	var head_to_food = astar(grid, hRow, hCol, fRow, fCol,snakeBody);
  	if(head_to_food.pathOfDirs==null){
  		console.log("Couldn't find head to food path");
  	} else {
    	for(var i=1;i<head_to_food.len;i++)
    	{
    		var point=head_to_food.pathOfTiles[i];
    		new_grid[point.x][point.y]=1;
    	}
    }
  	var food_to_tail = astar(new_grid, fRow, fCol, butt.row, butt.col,snakeBody);
  	if(food_to_tail.pathOfDirs==null){
  		console.log("Couldn't find food to tail path");
  	}
  	//if (head_to_food.pathOfDirs == null || food_to_tail.pathOfDirs == null) {
  	if (false) {
  		console.log("Picking head to tail");
  		path_info = {len:head_to_tail.pathOfDirs.length,pathOfDirs:head_to_tail.pathOfDirs,pathOfTiles:head_to_tail.pathOfTiles};
      console.log(path_info);
      console.log(head_to_tail);
      console.log("Next dir: " + path_info.pathOfDirs[pathPosition]);
      if (head_to_tail.pathOfDirs == null) {

        console.log("welp, gg");
        while(true);
      }
  	}
  	else {
  		console.log("Picking head to food to tail");
  		var new_path = head_to_food.pathOfDirs.concat(food_to_tail.pathOfDirs);
  		var new_tiles=head_to_food.pathOfTiles.concat(food_to_tail.pathOfTiles);
  		var head_to_food_to_tail = {len:new_path.length,pathOfDirs:new_path,pathOfTiles:new_tiles};
  		path_info = head_to_food_to_tail;
  	}
  	console.log(path_info);
  	for(var i=1;i<path_info.len;i++)
  	{
  		var point=path_info.pathOfTiles[i];
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
  }
  var dir= path_info.pathOfDirs[pathPosition];
  pathPosition++;
  console.log("Pos: "+(pathPosition-1)+"\tLen: "+path_info.len+"\tDir: "+dir);
  return dir;
}
