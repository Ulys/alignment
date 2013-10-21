// Scripts for alignment page

//validator by Anton
var aminonucleotids = ['G', 'A', 'C', 'T', 'А', 'С', 'Т', 'А', 'С', 'Т'];



$(function(){
	$( '.Input #firstSequence' ).change(function() {validate(this)});
	$( '.Input #secondSequence' ).change(function() {validate(this)});
	$( '.Input button').click(function() {
		validate($( '.Input input')[0]);
		validate($( '.Input input')[1]);
		firstSequence = getSequences($( '.inputBlock input')[0]);
		secondSequence = getSequences($( '.inputBlock input')[1]);
		if((firstSequence != 0) && (secondSequence != 0))
			var outStructure = new createStructureForOutput($('.Matrix table'), $(".Result p"));
			switch($('.inputBlock select').val()){
			case 'global': 
				doGlobalAlignment(firstSequence, secondSequence, outStructure);
				break;
			case 'local': break;
			case 'pseudo':
				doPseudoGlobalAlignment(firstSequence, secondSequence, outStructure);
				break;
			}
			
		$('.Result').show();
		console.log($('select').value);
	});

	$('#clear').click(function() {
		doAllClear();
	});

	var isTableVisible = false;
	$('.Matrix').hide();
	$('.Result').hide();
	$('.Result #click').click(function(){
		if (!isTableVisible)
			$('.Matrix').show('slow');
		else 
			$('.Matrix').hide('slow');
		isTableVisible = !isTableVisible;
	});
});
outPutStructure = {
	wayMatrix: 0,
	weightMatrix: 0,
	firstSequenceResult: 0,
	secondSequenceResult: 0,
}
var createStructureForOutput = function(tables, strings) {
		this.weightMatrix = tables[0];
		this.wayMatrix = tables[1];
		this.firstSequenceResult = strings[0];
		this.secondSequenceResult = strings[1];
}

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
	if (typeof sequencesObject.value != 'undefined' || sequencesObject.value !='')
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
var doAllClear = function() {
	location.reload();
}

var showAlignmentResults = function (outStructure, weight, way, firstSequence, secondSequence) {
	outStructure.weightMatrix.innerHTML = tableGeneration(weight);
	outStructure.wayMatrix.innerHTML = tableGeneration(way);
	outStructure.firstSequenceResult.innerText = firstSequence;
	outStructure.secondSequenceResult.innerText = secondSequence;
}