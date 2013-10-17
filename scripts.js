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
			doGlobalAlignment(firstSequence, secondSequence, $('.Matrix table'), $(".Result p"));
		$('.Result').show();
		console.log($('select').value);
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