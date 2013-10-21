var doPseudoGlobalAlignment = function(firstSequence, secondSequence, outStructure) {
	var sequence1 = firstSequence;
	var sequence2 = secondSequence;
	var sequenceArray1 = [];
	var sequenceArray2 = [];
	var subSeqMatrix = initializeTable (firstSequence, secondSequence);
	var wayMatrix = initializeTable (firstSequence, secondSequence);
	//Ініціюємо перший рядок і стовпець матриць
	for (var i = 1; i < sequence2.length+2; i++) {
		for (var j = 1; j < sequence1.length+2; j++) {
			if (i==1) {
				subSeqMatrix[i][j]=0; 
				wayMatrix[i][j]='left'
			} 
			else if (i>1 && j==1) {
				subSeqMatrix[i][j]=0; 
				wayMatrix[i][j]='up'
			}; 
		};
	};
	//Розраховуємо матрицю ваг-префіксів
	for (var i = 2; i < sequence2.length+2; i++) {
		for (var j = 2; j < sequence1.length+2; j++) {
			var up = subSeqMatrix[i-1][j]-2;
			if (sequenceArray1[j]==sequenceArray2[i-1]) {
				var diag = subSeqMatrix[i-1][j-1]+1
			} 
			else {
				var diag = subSeqMatrix[i-1][j-1]-1
			};
			var left = subSeqMatrix[i][j-1]-2;
			subSeqMatrix[i][j] = Math.max(up,diag,left);
	       //Паралельно заповнимо матрицю шляху       
		    if (subSeqMatrix[i][j] == up) {wayMatrix[i][j] = 'up'};
		    if (subSeqMatrix[i][j] == left) {wayMatrix[i][j] = 'left'};
		    if (subSeqMatrix[i][j] == diag) {wayMatrix[i][j] = 'diag'};	
		};
	};        		
	// Побудова вирівнювання
	var resultSequence1 = '';
	var resultSequence2 = '';
	var i = wayMatrix.length;
	var j = wayMatrix[0].length;
	while (i>1 && j>1) {
		if (wayMatrix[i-1][j-1] == 'up') {
			resultSequence1 = '_' + resultSequence1;
			resultSequence2 = wayMatrix[i-1][0] + resultSequence2;
			i = i - 1;
		}
		else {
			if (wayMatrix[i-1][j-1] == 'left') {
				resultSequence1 = wayMatrix[0][j-1] + resultSequence1;
				resultSequence2 = '_' + resultSequence2;
				j = j - 1;
			}
			else {
				resultSequence1 = wayMatrix[0][j-1] + resultSequence1;
				resultSequence2 = wayMatrix[i-1][0] + resultSequence2;
				i = i - 1;
				j = j - 1;
			};    
		};
	};

	showAlignmentResults(outStructure, subSeqMatrix, wayMatrix, resultSequence1, resultSequence2);
};