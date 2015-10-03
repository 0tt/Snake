/**
  * Return the value corresponding to where to go
  * 	0: up
  *		1: right
  *		2: down
  *		3: left
  *       0
  *     3   1
  *	      2
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
  */

gameState = {
  stackUpLeft : 0,
  headingForFood : true,
  foodLocation : {
    x : 0,
    y : 0
  }
}

function getSnakeLength(grid){
  len=0;
  for(var x = 0; x<grid[0].length; x++){
    for(var y=0; y<grid.length; y++){
      if(grid[y][x] == 1) len++;
    }
  }
  len-=grid[0].length * 2;
  len-=grid.length * 2 - 4;
  console.log("found snakeLength of "+len);
  return len;
}

function getBasicMove(currentDirection, grid, fRow, fCol, hRow, hCol){

  //console.log(grid);
  if(hRow>fRow){
    if(hRow>0 && grid[hRow-1][hCol]!=1) return 0;
  }
  if(hRow<fRow){
    if(hRow<grid.length-1 && grid[hRow+1][hCol]!=1) return 2;
  }
  if(hCol>fCol){
    if(hCol>0 && grid[hRow][hCol-1]!=1) return 3;
  }
  if(hCol<fCol){
    if(hCol<grid[0].length-1 && grid[hRow][hCol+1]!=1) return 1;
  }
  
  if(hRow>0 && grid[hRow-1][hCol]!=1) return 0;
  if(hRow<grid.length-1 && grid[hRow+1][hCol]!=1) return 2;
  if(hCol>0 && grid[hRow][hCol-1]!=1) return 3;
  if(hCol<grid[0].length-1 && grid[hRow][hCol+1]!=1) return 1;
}

function calculateMove(currentDirection, grid, fRow, fCol, hRow, hCol) {
  // This algorithm simply causes the sanke to go in a circle
  //return getBasicMove(currentDirection, grid, fRow, fCol, hRow, hCol);
  var snakeLength=getSnakeLength(grid);
  //console.log("Food was at "+ gameState.foodLocation.x +","+gameState.foodLocation.y);

  if(gameState.stackUpLeft == 0 && gameState.headingForFood == false){
    gameState.headingForFood=true;
  }
  
  if(fCol != gameState.foodLocation.x || fRow != gameState.foodLocation.y){
    //we ate the food
    console.log("We ate the food");
    gameState.headingForFood = false;
    gameState.foodLocation.x = fCol;
    gameState.foodLocation.y = fRow;
  }

  if(snakeLength > 20 && gameState.stackUpLeft == 0 && gameState.headingForFood == false){
    console.log("Starting to stack off");
    gameState.stackUpLeft = snakeLength;
  }

  if(gameState.stackUpLeft > 0 && gameState.headingForFood == false){
    console.log("Stacking off with "+gameState.stackUpLeft+" remaining");
    gameState.stackUpLeft--;
    return stackOff(currentDirection, grid, fRow, fCol, hRow, hCol);
  } else {
    console.log("Switching to headingForFood");
    gameState.headingForFood = true;
  }


  console.log("astar-ifying")
  return astar(grid, fRow, fCol, hRow, hCol);


  // TODO: Decide whether to do an A-Star for the fruit, or stack off to the side, call the corresponding function, and return its value.
  //       View utilities.js and snake.js for function params
}