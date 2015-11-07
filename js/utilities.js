// converts a tile list to a path
function convertTileListToPath(tilePath) {
  var path = [];
  for(var i = 1; i < tilePath.length; i++) {
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

// returns whether or not a point is traversable
function isTraversable(snakeBody, point, path) {
	if (point == null || path == null || snakeBody == null)
		return false; // smth went wrong
	if (point.value < 1)
		return true;
	else {
		var node = snakeBody.b0;
		for (var i = 0; i < path.length; i++) {
			if (node.x == point.x && node.y == point.y)
				return true;
			node = node.next;
		}
		return false;
	}
}

// Returns a point object, given where it is in the grid and what its value is.
 function pointOfGrid(endX, endY, pValue) {
 	var toReturn = {
 		x: endX,
 		y: endY,
 		visited: false,
 		value: pValue
 	};
 	return toReturn;
 }

// Returns a list of adjacent points, given a grid of Point objects, and a point object
function getAdjacent(gridPoints,point, snakeBody, path) {
	try {
		var adjTiles = [];
		var up = gridPoints[point.x][point.y + 1];
//        if (up !== null && up.value <= 0) {
		if (isTraversable(snakeBody, up, path)) {
            adjTiles.push(up);
		}
		var down = gridPoints[point.x][point.y - 1];
//        if (down !== null && down.value <= 0) {
		if (isTraversable(snakeBody, down, path)) {
            adjTiles.push(down);
		}
		var left = gridPoints[point.x - 1][point.y];
		if (isTraversable(snakeBody, left, path)) {
//        if (left !== null && left.value <= 0) {
            adjTiles.push(left);
		}
        var right = gridPoints[point.x + 1][point.y];
//        if (right !== null && right.value <= 0) {
		if (isTraversable(snakeBody, right, path)) {
            adjTiles.push(right);
		}
        return adjTiles;
	} catch(err) {
		return [];
	}

}

// g, h, diaginalPenalty, f are used in astar
function g(obj) {
	return obj.list.length -1;
}

function h(obj,endX,endY) {
	return Math.sqrt(Math.pow((obj.point.x - endX), 2) + Math.pow(obj.point.y - endY, 2)); 
}

function diaginalPenalty(obj) {
	var list = obj.list;
	var penalty = 0;
	var lastDirection = -1;
	for (var i = 1; i < list.length; i++) {
		var currentDirection = -1;
		if (list[i - 1].x > list[i].x) {
			currentDirection = 0;
		} else if (list[i - 1].x < list[i].x) {
			currentDirection = 1;
		} else if (list[i - 1].y > list[i].y) {
			currentDirection = 2;
		} else if (list[i - 1].y < list[i].y) {
			currentDirection = 3;
		}
		if (currentDirection != lastDirection)
			penalty++;
		lastDirection = currentDirection;
	}
}

function f(obj,endX,endY) {
	return g(obj) + h(obj,endX,endY) + diaginalPenalty(obj);
}



/**
  * Finds the shortest path from start to end using the A-Star algorithm.
  * grid: defined as in snakeAI.js
  * startX, startY: The head of the snake
  * endX, endY: The food location
  * snakeBody: A circular linked list of the snake body. View snakeAI.js for more info
  * returns: an object with the following properties
  *     dir: 0..3 depending on where the first move towards the goal from the start is. View snakeAI.js for what 0..3 correspond to.
  *     len: the length of the path to the goal
  *     pathOfTiles: An array of tiles corresponding to a path from the start to the end
  *     pathOfDirs: An array of dir ints corresponding to a path from the start to the end
  */
  
function astar(grid, startX, startY, endX, endY, snakeBody) {
	var gridPoints = [];
	for (var i = 0; i < grid.length; i++) {
		gridPoints.push([]);
		for(var j = 0; j < grid.length; j++){
			gridPoints[i].push(pointOfGrid(i,j, grid[i][j]));
		}
	}
	var first = {
		point:gridPoints[startX][startY],
		list:[gridPoints[startX][startY]],
	};
	first.point.visited = true;
	var processingList = [];
	processingList.push(first);
	while(processingList.length !== 0) {
		var current = processingList[0];
		var remove = 0;
		for (var i = 1; i < processingList.length; i++) {
			if (f(current, endX, endY) > f(processingList[i],endX, endY)) {
				current = processingList[i];
				remove = i;
			}
		}
		processingList.splice(remove,1);
		var adjacent = getAdjacent(gridPoints, current.point, snakeBody, current.list);
		for(var i =  0; i < adjacent.length; i++)
		{
			if(!adjacent[i].visited)
			{
				adjacent[i].visited = true;
				var newlist = current.list.slice();
				newlist.push(adjacent[i]);
				if (adjacent[i].x == endX && adjacent[i].y == endY) {
					var secondItem = newlist[1];
					if (secondItem.x > startX) 
						return {dir:2,len:newlist.length,pathOfTiles:newlist,pathOfDirs:convertTileListToPath(newlist)};
					else if (secondItem.x < startX)
						return {dir:0,len:newlist.length,pathOfTiles:newlist,pathOfDirs:convertTileListToPath(newlist)};
					else if (secondItem.y > startY)
						return {dir:1,len:newlist.length,pathOfTiles:newlist,pathOfDirs:convertTileListToPath(newlist)};
					else
						return {dir:3,len:newlist.length,pathOfTiles:newlist,pathOfDirs:convertTileListToPath(newlist)};
				}
				var addTo = {
					point: gridPoints[adjacent[i].x][adjacent[i].y],
					list: newlist
				};
				processingList.push(addTo);
			}
		}
	}
	console.log("A* has been executed and has been unable to find a path.");
	return {dir:-1,len:Number.MAX_SAFE_INTEGER, pathOfTiles:null, pathOfDirs:null};
}
