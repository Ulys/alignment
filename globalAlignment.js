//Global Alignment

var doGlobalAlignment = function(firstSequence, secondSequence, tableOutput, stringOutput) { 
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
	var firstResultSeq  = '';
	var secondResultSeq = '';
	var x = firstSequence.length;
	var y = secondSequence.length;
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
				if ( y >= 1){
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
	tableOutput[0].innerHTML = tableGeneration(table);
	tableOutput[1].innerHTML = tableGeneration(way);
	stringOutput[0].innerText = firstResultSeq;
	stringOutput[1].innerText = secondResultSeq;
}

var initializeTable = function (firstSequence, secondSequence) {
	var table = [];
	for (i = 0; i < firstSequence.length + 2; i++){
		var row = [];
		for (j = 0; j < secondSequence.length + 2; j++)
			row.push(0);
		table.push(row);
	}
	table[0][0] = 'Symbol';
	table[0][1] = '_';
	table[1][0] = '_';
	for (i = 2; i < firstSequence.length + 2; i++){
		table[i][0] = firstSequence[i - 2];
		table[i - 1][1] = 0;
	}
	for (j = 2; j < secondSequence.length + 2; j++){
		table[0][j] = secondSequence[j - 2];
		table[1][j - 1] = 0;
	}
	return table;
}

var tableGeneration =  function(table) {
	var innerText = '';
	for (x = 0; x < table.length; x++) {
		innerText += '<tr>';
		for (y = 0; y < table[x].length; y++) {
			if (x == 0 || y == 0)
				innerText +='<th>';
			else 
				innerText +='<td>';
			innerText += table[x][y];
			if (x == 0 || y == 0) 
				innerText +='</th>';
			else
				innerText +='</td>';
		}
			innerText += '</tr>';
	}
	return innerText;
}