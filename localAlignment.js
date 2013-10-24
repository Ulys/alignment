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
	
	console.log(table)

}