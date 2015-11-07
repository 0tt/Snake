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

function convertTileListToPath(tilePath) {
  var path = [];
  for(var i = 1; i < filePath.length; i++) {
    var firstItem = tilePath[i-1];
    var secondItem = tilePath[i];
    if (secondItem.x > firstItem.x) 
      path.push(2);
    else if (secondItem.x < firstItem.x)
      path.push(0);
    else if (secondItem.y > firstItem.y)
      path.push(1);
    else
      path.push(3);
  }
  return path;
}

function calculateMove(moveType,currentDirection, grid, fRow, fCol, hRow, hCol, snakeBody,snakeLength) {
  // var result = astar(grid, hRow, hCol, fRow, fCol,snakeBody);

  // using length to food to determine when to do astar - working (we think)
  var force = false;
  var astar_object = astar(grid, hRow, hCol, fRow, fCol,snakeBody);
  if (lastFoodRow != fRow || lastFoodCol != fCol) {
    lastFoodRow = fRow;
    lastFoodCol = fCol;
    console.log("resetting..");
    var node = snakeBody.b0;
    var length = 1;
    do {
      node = node.next;
      length++;
    } while (node != snakeBody.b0);
    numToDo = Math.floor(length * 1.2);
    numHaveDone = 0;
    var minimumDistance = 10000000000;
    force = true;
  } else {
    force = false;
  }
  var result;
  if ( /* numToDo > numHaveDone || */ force || astar_object.len > minimumDistance) {
    console.log("stacking...");
    result=stackOff(currentDirection,grid, hRow, hCol, fRow, fCol,snakeLength,0);
    numHaveDone++;
  } else {
    console.log("astar...");
    result = astar_object.dir;
    if(result===-1){
      result=stackOff(currentDirection,grid, hRow, hCol, fRow, fCol,snakeLength,0);
    }
    minimumDistance = Math.min(minimumDistance,astar_object.len);
  }
  

  // using length of snake to determine how many times to stack off to side
  // works (we think)
  // if (lastFoodRow != fRow || lastFoodCol != fCol) {
  //   lastFoodRow = fRow;
  //   lastFoodCol = fCol;
  //   console.log("resetting..");
  //   var node = snakeBody.b0;
  //   var length = 1;
  //   do {
  //     node = node.next;
  //     length++;
  //   } while (node != snakeBody.b0);
  //   numToDo = length * 2;
  //   numHaveDone = 0;
  // }
  // var result;
  // if (numToDo > numHaveDone) {
  //   console.log("stacking...");
  //   result=stackOff(currentDirection,grid, hRow, hCol, fRow, fCol,snakeLength,0);
  //   numHaveDone++;
  // } else {
  //   console.log("astar...");
  //   result = astar(grid, hRow, hCol, fRow, fCol,snakeBody);
  //   if(result===-1){
  // 		result=stackOff(currentDirection,grid, hRow, hCol, fRow, fCol,snakeLength,0);
  // 	}
  // }
  // console.log("Length to food = " + astar_length(grid, hRow, hCol, fRow, fCol,snakeBody));




// using convex hull
	// var convexHull = new ConvexHullGrahamScan();
	// var node = snakeBody.b0;
 //  do {
 //    convexHull.addPoint(node.col, node.row);
 //    node = node.next;
 //  } while (node != snakeBody.b0);
 //  var hullSnake = convexHull.getHull();

 //  var convexHullEmptySpace
 //  for (var x = 1; x < grid.length-1; x++) {
 //      for (var y = 1; y < grid[0].length-1; y++) {
	// 			if (grid[x][y] == 0)
	// 				convexHullEmptySpace.addPoint(x, y);
	// 		}
	// }
 //  var hullEmptySpace = convexHullEmptySpace.getHull();
	
	// var output = "";
	// for (var i = 0; i < hull.length; i++) {
	// 	output += "(" + hull[i].x + "," + hull[i].y + "),";
	// }
	// console.log(output);



	return result;
}
