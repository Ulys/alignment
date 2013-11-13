var doPseudoGlobalAlignment = function(firstSequence, secondSequence, outStructure) {
	
	var table = initializeTable (firstSequence, secondSequence);
	var way = initializeTable (firstSequence, secondSequence);
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
	for (var i = 2; i < firstSequence.length+2; i++) {
		for (var j = 2; j < secondSequence.length+2; j++) {
			var up = table[i-1][j]-2;
			if (firstSequence[i - 2] == secondSequence[j- 2]) {
				var diag = table[i-1][j-1]+1
			} 
			else {
				var diag = table[i-1][j-1]-1
			};
			var left = table[i][j-1]-2;
			table[i][j] = Math.max(up,diag,left);     
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
			var data = new createStructureForReturnWay(firstSequence, secondSequence, way, startPoint[i][j].i, startPoint[i][j].j, firstResultSeq, secondResultSeq);
			resultsStrings.push(findReturnWay(data));
		}
	}
	var resultStructure = new createOutputStrucutre(table, way, stringComparisionForPseudo(resultsStrings));
	showAlignmentResults(outStructure, resultStructure);	
};
var stringComparisionForPseudo = function(result){
	var innerText = '';
	for (var i = 0; i < result.length; i++){
		innerText += "<tr>";
		for(var j = 0; j < result[i].sequence1.length; j++){
			innerText +="<td>";
			innerText += result[i].sequence1[j];
			innerText +="</td>";
		}
		innerText += "</tr><tr><td></td></tr><tr>";
		for(var j = 0; j < result[i].sequence2.length; j++){
			innerText +="<td>";
			innerText += result[i].sequence2[j];
			innerText +="</td>";
		}
		innerText += "</tr>";
	}
	return innerText;
};
var prepareStringForReturnWay = function(template, startPoint, finishPoint, templateResult, resultSeq){
	while(finishPoint < startPoint){
		console.log("inFunction");
		resultSeq += '_' + resultSeq;
		templateResult += template[startPoint - 1] + templateResult;
		startPoint--;
	}
	console.log(resultSeq);
	console.log(templateResult)
};