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
			var outStructure = new createStructureForOutput($('.Matrix table'), $(".Result table"));
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
	// Was create for clear Button. Does we still need it?
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
var stringComparision = function (template, results){
	var innerText = '';
	innerText += '<tr>';
	for (var i = 0; i < template.length; i++){
		innerText += '<td>';
		innerText += template[i];
		innerText += '</td>';
	}
	innerText += '</tr>';
	for (var i = 0; i < results.length; i++){
		innerText += '<tr>';
		for(var j = 0; j < results[i].length; j++){
			innerText += '<td>';
			innerText += results[i][j];
			innerText += '</td>';
		}	
		innerText += '</tr>';
	}
	return innerText;
}
var isPatternAlreadyIn = function (pattern, collection) {
	for (var i = 0; i < collection.length; i++){
		if (collection[i] == pattern)
			return true;
	}
	return false;
};

var findStartPoints = function (weightTable) {
	var arrayOfCoordinates = [];
	
	var maxInRow = 0;
	var maxInColumn = 0;
	// Warning!!!! The coner element included only in Column
	for (var j = 0; j < weightTable[0].length; j++) {
		if (weightTable[weightTable.length-1][j] > maxInRow) {
			maxInRow = weightTable[weightTable.length-1][j]
		};
	};
	// Warning!!!! The coner element included only in Column
	for (var i = 0; i < weightTable.length; i++) {
		if (weightTable[i][weightTable[0].length-1] > maxInColumn) {
			maxInColumn = weightTable[i][weightTable[0].length-1];
		};
	};

	if(maxInRow > maxInColumn){
		arrayOfCoordinates.push(putRowInResult(weightTable, maxInRow));
	} else if (maxInRow < maxInColumn){
		arrayOfCoordinates.push(putColumnInResult(weightTable, maxInColumn));
	} else {
		arrayOfCoordinates.push(putColumnInResult(weightTable, maxInColumn));
		arrayOfCoordinates.push(putRowInResult(weightTable, maxInRow));
	}

	return arrayOfCoordinates;
};
var putColumnInResult = function (weightTable, max){
	var result = [];
	for (var i = 0; i < weightTable.length; i++) {
		if (weightTable[i][weightTable[0].length-1] == max) {
			var coordinate = new createCoordinate (i, weightTable[0].length-1, max);
			result.push(coordinate);
		};
	};
	return result;
};
var putRowInResult = function (weightTable, max){
	var result = [];
	for (var j = 0; j < weightTable[0].length; j++) {
		if (weightTable[weightTable.length-1][j] == max) {
			var coordinate = new createCoordinate (weightTable.length-1, j, max);
			result.push(coordinate);
		};	
	};
	return result;
};

var doAllClear = function() {
	location.reload();
}

var showAlignmentResults = function (outStructure, resultStructure) {
	outStructure.weightMatrix.innerHTML = tableGeneration(resultStructure.weightMatrix);
	outStructure.wayMatrix.innerHTML = tableGeneration(resultStructure.wayMatrix);
	outStructure.strings.innerHTML = resultStructure.strings;
}
var decorateOutputFirstString = function(input, output){
	var result = output;
	for(i = output.length; i < input.length; i ++){
		result += input[i];
	}
	return result;
}
var decorateOutputSecondString = function(template, output){
	var result = output;
	for(i = output.length; i < template.length; i ++){
		result += "_";
	}
	return result;
}