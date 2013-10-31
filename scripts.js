// Scripts for alignment page

//validator by Anton
var aminonucleotids = ['G', 'A', 'C', 'T', 'А', 'С', 'Т', 'А', 'С', 'Т'];



$(function(){
	$('.Matrix').hide();
	$('.Result').hide();
	$( '.Input #firstSequence' ).change(function() {validate(this)});
	$( '.Input #secondSequence' ).change(function() {validate(this)});
	$( '.Input button').click(function() {
		validate($( '.Input input')[0]);
		validate($( '.Input input')[1]);
		var firstSequence = getSequences($( '.inputBlock input')[0]);
		var secondSequence = getSequences($( '.inputBlock input')[1]);
		if((firstSequence != 0) && (secondSequence != 0)){
			var outStructure = new createStructureForOutput($('.Matrix table'), $(".Result p"));
			switch($('.inputBlock select').val()){
			case 'global': 
				doGlobalAlignment(firstSequence, secondSequence, outStructure);
				break;
			case 'local':
				doLocalAlignment(firstSequence, secondSequence, outStructure);
				break;
			case 'pseudo':
				doPseudoGlobalAlignment(firstSequence, secondSequence, outStructure);
				break;
			}
			$('.Result').show();
		}
	});

	$(".tab").tabs();

	$('#clear').click(function() {
		doAllClear();
	});


	var isTableVisible = false;	
	$('.Result #click').click(function(){
		if (!isTableVisible)
			$('.Matrix').show('slow');
		else 
			$('.Matrix').hide('slow');
		isTableVisible = !isTableVisible;
	});
});

var validate = function(objectForValidate){
	if (typeof objectForValidate.value != "undefined"){
		var stringForValidate = objectForValidate.value;
		stringForValidate = stringForValidate.toUpperCase();
		if (!stringValidate(stringForValidate)){
			alert("Your sequnce is NOT Allowed");
			objectForValidate.value = '';
		} 
	} else 
		alert("You have not input sequence");	
}
var stringValidate = function(stringForValidation) {
	for (i in stringForValidation){
		var isSequenceReal = false;
		for(j = 0; j < aminonucleotids.length; j++)
			if(aminonucleotids[j] == stringForValidation[i]){
				isSequenceReal = true;
				break;
			}
		if (!isSequenceReal)
			return false;
	}
	return true;
}
var getSequences = function(sequencesObject){
	if (typeof sequencesObject.value != 'undefined' && sequencesObject.value !='')
		return sequencesObject.value.toUpperCase();
	else
		return 0;
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

var findStartPoints = function (weightTable) {
	var arrayOfCoordinates = [];
	
	var maxInRow = 0;
	var i = weightTable.length-1;

	for (var j = 0; j < weightTable[0].length; j++) {
		if (weightTable[i][j] > maxInRow) {
			maxInRow = weightTable[i][j]
		};
	};

	for (var j = 0; j < weightTable[0].length; j++) {
		if (weightTable[i][j] == maxInRow) {
			var coordinate = new createCoordinate (i, j, maxInRow);
			arrayOfCoordinates.push(coordinate);
		};
			
	};
	
	var maxInColumn = 0;
	var j = weightTable[0].length-1;
	
	for (var i = 0; i < weightTable.length-1; i++) {
		if (weightTable[i][j] > maxInColumn) {
			maxInColumn = weightTable[i][j]
		};
	};

	for (var i = 0; i < weightTable.length-1; i++) {
		if (weightTable[i][j] == maxInColumn && maxInColumn>=maxInRow) {
			var coordinate = new createCoordinate (i, j, maxInColumn);
			arrayOfCoordinates.push(coordinate);
		};
	};

	return (arrayOfCoordinates);
//<<<<<<< HEAD
};
//=======

var findReturnWay = function (firstSequence, secondSequence, weightTable, wayTable, startCoordinate, stop) {

	var firstResultSeq  = '';
	var secondResultSeq = '';
	
	var i = startCoordinate.i;
	var j = startCoordinate.j;
	
	var x = weightTable.length - 2;
	var y = weightTable[0].length - 2;

	//Дописати рядки з двох боків
	/*if (x > y) {

	}*/

	do {
		if (wayTable[i][j] == 'up') {
			firstResultSeq = '_' + firstResultSeq;
			if ( j >= 1) {
				secondResultSeq = secondSequence[j-2] + secondResultSeq;
				j -= 1;
			} else secondResultSeq = "_" + secondResultSeq; 
		}
			else {
				if (wayTable[i][j] == 'left') {
					secondResultSeq = '_' + secondResultSeq;
					if (i >= 1) {
						firstResultSeq = firstSequence[i-2] + firstResultSeq;
						i -= 1;
					} else firstResultSeq = '_' + firstResultSeq;
				} else {
					if (j >= 1) {
						secondResultSeq = secondSequence[j-2] + secondResultSeq;
						j -= 1;
					} else secondResultSeq = "_" + secondResultSeq;
					if (i >= 1) {
						firstResultSeq = firstSequence[i-2] + firstResultSeq;
						i -= 1;
					} else firstResultSeq = '_' + firstResultSeq;
				  };
			};

	} while (wayTable[i][j] != stop);
	
	var resultPairStrings = new createPairStrings (firstResultSeq, secondResultSeq);
	return (resultPairStrings);
};
//>>>>>>> Added FindWay function to Global Alignment

var doAllClear = function() {
	location.reload();
}

var showAlignmentResults = function (outStructure, resultStructure) {
	outStructure.weightMatrix.innerHTML = tableGeneration(resultStructure.weightMatrix);
	outStructure.wayMatrix.innerHTML = tableGeneration(resultStructure.wayMatrix);
	outStructure.firstSequence.innerText = resultStructure.firstSequence;
	outStructure.secondSequence.innerText = resultStructure.secondSequence;
}