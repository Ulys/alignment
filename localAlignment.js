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
	
	var startPoint = findStartPoints(table);
	var results = [];
	for (var i = 0; i < startPoint[0].length; i++){
		var firstResultSeq = "";
		var secondResultSeq = "";
		var x = startPoint[0][i].i - 1;
		var y = startPoint[0][i].j - 1;
		while (x >= 1 || y >= 1){
			if (way[x][y] == 'up'){
				firstResultSeq = '_' + firstResultSeq;
				if ( y >= 1){
					secondResultSeq = secondSequence[y - 1] + secondResultSeq;
					y -= 1;
				}else
					secondResultSeq = "_" + secondResultSeq;
			} else {
				if (way[x][y] == 'left'){
					secondResultSeq = '_' + secondResultSeq;
					if (x >= 1){
						firstResultSeq = firstSequence[x - 1] + firstResultSeq;
						x -= 1;
					} else
						firstResultSeq = '_' + firstResultSeq;
				} else {
					if (y >= 1){
						secondResultSeq = secondSequence[y - 1] + secondResultSeq;
						y -= 1;
					}else
						secondResultSeq = "_" + secondResultSeq;
					if (x >= 1){
						firstResultSeq = firstSequence[x - 1] + firstResultSeq;
						x -= 1;
					} else
						firstResultSeq = '_' + firstResultSeq;
				}
			}
		}
		firstResultSeq = decorateOutputFirstString(firstSequence, firstResultSeq);
		results.push(new createPairStrings(firstResultSeq, decorateOutputSecondString(firstResultSeq, secondResultSeq)));
	}
	var stringResult = "";
	if (results.length == 1){
		stringResult = results[0].resultSeq2;
	} else {
		for(var i = 0; i < results.length; i++){
			stringResult += results[i].resultSeq2;
			if(i != results.length - 1){
				stringResult += "<br>";
			}
		}		
	}
	console.log(startPoint);

	var resultStructure = new createOutputStrucutre(table, way, firstResultSeq, stringResult);
	showAlignmentResults(outStructure, resultStructure);

}