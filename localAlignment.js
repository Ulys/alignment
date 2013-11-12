//Local Alignment
var doLocalAlignment = function (firstSequence, secondSequence, outStructure) { 
	
	if (firstSequence.length < secondSequence.length) {
		var tempSequence = firstSequence;
		firstSequence = secondSequence;
		secondSequence = tempSequence;
	}

	var table = initializeTable(firstSequence, secondSequence);
	var way   = initializeTable(firstSequence, secondSequence);	
	var resultTable = [];

	for (i = 2; i < firstSequence.length + 2; i++){
		table[i - 1][1] = 0;
		way[i - 1][1]   = 0;
	}

	for (j = 2; j < secondSequence.length + 2; j++){
		table[1][j - 1] = 0;
		way[1][j - 1]   = 0;
	}

	table[1][1] = 0;
	way[1][1] = 0;

	for (i = 2; i < firstSequence.length + 2; i++){
		for (j = 2; j < secondSequence.length + 2; j++){
			var up = table[i][j - 1] - 2;
			(firstSequence[i - 2] == secondSequence[j - 2]) ? D = 1 :  D = (-1);
			var diag = table[i - 1][j - 1] + D;
			var left = table[i - 1][j] - 2;
			table[i][j] = Math.max(up, left, diag);			
			if (table[i][j] == diag)
				way[i][j] = 'diag';
			if (table[i][j] == left)
				way[i][j] = 'left';
			if (table[i][j] == up)
				way[i][j] = 'up';
		}
	}
	
	var temporaryResult = countTemporaryResult(firstSequence, secondSequence);
	var finalResult = findResult(temporaryResult, countMaxLength(temporaryResult));
	var beginPoint = findHomolgyStartPoint(finalResult, firstSequence);
	var readyForOutPut = prepareForOutput(finalResult, beginPoint);
	
	var resultStructure = new createOutputStrucutre(table, way, stringComparision(firstSequence, readyForOutPut));
	showAlignmentResults(outStructure, resultStructure);
}
var countMaxLength = function(result){
	var maxLength = 0;
	for(var i = 0; i < result.length; i++){
		if (result[i].length > maxLength){
			maxLength = result[i].length;
		}
	}
	return maxLength;
}
var findResult = function(result, maxLength){
	var finalResult = [];
	for(var i = 0; i < result.length; i++){
		if((result[i].length == maxLength) && !isPatternAlreadyIn(result[i], finalResult)){
			finalResult.push(result[i]);
		}
	}
	return finalResult;
}
var countTemporaryResult = function(firstSequence, secondSequence){
	var result = [];
	for (var i = 1; i <= secondSequence.length; i++){
		for (var k = 0; k <= secondSequence.length - i; k++){
			var firstSubstring = secondSequence.substring(k, k + i);
			for(var j = 0; j <= firstSequence.length - i; j++){
				if(firstSubstring == firstSequence.substring(j, j + i))
					result.push(firstSubstring);
			}
		}
	}
	return result;
}
var findHomolgyStartPoint = function(result, firstSequence){
	var beginPoint = [];
	for (var i = 0; i < result.length; i++){
		var count = [];
		for(var j = 0; j <= firstSequence.length - result[i].length; j++){	
			if(result[i] == firstSequence.substring(j, result[i].length + j)){
				count.push(j);
			}
		}
		if (count.length != 0){
			beginPoint.push(count);
		}
	}
	return beginPoint;
}
var prepareForOutput = function(result, beginPoint){
	var readyForOutPut = [];
	for (var i = 0; i < beginPoint.length; i++){
		for(var j = 0; j < beginPoint[i].length; j++){
			var temp = result[i];
	 		for(var k = beginPoint[i][j] - 1; k >= 0; k--){
	 			temp = " " + temp;
	 		}
			while(temp.length < firstSequence.length){
				temp += " ";
			}
	 		readyForOutPut.push(temp);
		}
	}
	return readyForOutPut;
}