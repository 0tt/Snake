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

function randRange(a, b){
  return Math.floor((Math.random() * b) + a)
}
function randomDirection(currentDirection, grid, fRow, fCol, hRow, hCol){

}

function calculateMove(currentDirection, grid, fRow, fCol, hRow, hCol) {
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