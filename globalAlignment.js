//Global Alignment
var doGlobalAlignment = function(firstSequence, secondSequence, outStructure) { 
	var table = initializeTable(firstSequence, secondSequence);
	var way   = initializeTable(firstSequence, secondSequence);	
	for (i = 2; i < firstSequence.length + 2; i++){
		table[i - 1][1] = (i - 2) * (- 2);
		way[i - 1][1]   = 0;
		if (i == firstSequence.length + 1){
			table[i][1] = (i - 1) * (- 2);
			way[i][1]   = 0;
		}
	}
	for (j = 2; j < secondSequence.length + 2; j++){
		table[1][j - 1] = (j - 2) * (- 2);
		way[1][j - 1]   = 0;
		if (j == secondSequence.length + 1){
			table[1][j] = (j - 1) * (- 2);
			way[1][j]   = 0;
		}
	}
	way[1][1] = 0;
	fillInTables(firstSequence, secondSequence, table, way);
	var returnWay = new createStructureForReturnWay(firstSequence, secondSequence, way, firstSequence.length, secondSequence.length, "", "");
	var result = findReturnWay(returnWay);
	var resultStrings = [];
	resultStrings.push(result.sequence2);
	var resultStructure = new createOutputStrucutre(table, way, stringComparision(result.sequence1, resultStrings));
	showAlignmentResults(outStructure, resultStructure);	
}
