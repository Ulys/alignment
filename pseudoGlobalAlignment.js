var doPseudoGlobalAlignment = function(firstSequence, secondSequence, outStructure) {
	
	var table = initializeTable (firstSequence, secondSequence);
	var way = initializeTable (firstSequence, secondSequence);
	
	//Ініціюємо перший рядок і стовпець матриць
	for (var i = 1; i < firstSequence.length + 2; i++) {
		for (var j = 1; j < secondSequence.length + 2; j++) {
			if (i == 1) {
				table[i][j] = 0; 
				way[i][j] = 0;
			} 
			else if (i > 1 && j == 1) {
				table[i][j] = 0; 
				way[i][j] = 0;
			}; 
		};
	};
	
	//Розраховуємо матрицю ваг-префіксів
	for (var i = 2; i < firstSequence.length+2; i++) {
		for (var j = 2; j < secondSequence.length+2; j++) {
			var up = table[i-1][j]-2;
			if (firstSequence[i - 2]== secondSequence[j- 2]) {
				var diag = table[i-1][j-1]+1
			} 
			else {
				var diag = table[i-1][j-1]-1
			};
			var left = table[i][j-1]-2;
			table[i][j] = Math.max(up,diag,left);
	       //Паралельно заповнимо матрицю шляху       
		    if (table[i][j] == up) {
		    	way[i][j] = 'up';
		    }
		    if (table[i][j] == left){
		    	way[i][j] = 'left';
		    }
		    if (table[i][j] == diag){
		    	way[i][j] = 'diag';
		    }	
		}
	};        		
	
	// Побудова вирівнювання
	var startPoint = findStartPoints(table); 
	var resultsStrings = [];
	for(var i = 0; i < startPoint.length; i++){
		for(var j = 0; j < startPoint[i].length; j++){
			var firstResultSeq = '';
			var secondResultSeq = '';
			var x = startPoint[i][j].i;
			var y = startPoint[i][j].j;
			var tempX = firstSequence.length;
			var tempY = secondSequence.length;
			while(x < tempX){
				secondResultSeq = '_' + secondResultSeq;
				firstResultSeq = firstSequence[tempX - 1] + firstResultSeq;
				tempX--;
			}
			while(y < tempY){
				firstResultSeq = '_' + firstResultSeq;
				secondResultSeq = secondSequence[tempY - 1] + secondResultSeq;
				tempY--;
			}
			while (x >= 1 || y >= 1){
				if (way[x + 1][y + 1] == 'up'){
					firstResultSeq = '_' + firstResultSeq;
					if ( y >= 1){
						secondResultSeq = secondSequence[y - 1] + secondResultSeq;
						y -= 1;
					}else
						secondResultSeq = "_" + secondResultSeq;
				} else {
					if (way[x + 1][y + 1] == 'left'){
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
			resultsStrings.push(new createPairStrings(firstResultSeq, secondResultSeq));
		}
	}
	var resultStructure = new createOutputStrucutre(table, way, stringComparisionForPseudo(resultsStrings));
	showAlignmentResults(outStructure, resultStructure);	
};
var stringComparisionForPseudo = function(result){
	var innerText = '';
	for (var i = 0; i < result.length; i++){
		innerText += "<tr>";
		for(var j = 0; j < result[i].resultSeq1.length; j++){
			innerText +="<td>";
			innerText += result[i].resultSeq1[j];
			innerText +="</td>";
		}
		innerText += "</tr><tr><td></td></tr><tr>";
		for(var j = 0; j < result[i].resultSeq2.length; j++){
			innerText +="<td>";
			innerText += result[i].resultSeq2[j];
			innerText +="</td>";
		}
		innerText += "</tr>";
	}
	return innerText;
};