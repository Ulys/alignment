outPutStructure = {
	wayMatrix: 0,
	weightMatrix: 0,
	strings: 0
}

var createStructureForOutput = function(tables, strings) {
		this.weightMatrix = tables[0];
		this.wayMatrix = tables[1];
		this.strings = strings;
}

var createOutputStrucutre = function (weight, way, strings) {
	this.weightMatrix = weight;
	this.wayMatrix = way;
	this.strings = strings;
}

coordinate = {
	i: 0,
	j: 0,
	value: 0
}

var createCoordinate = function(i, j, value){
	if (typeof i != "undefined")
		this.i = i;
	if (typeof j != "undefined")
		this.j = j;
	if (typeof i != "undefined")
		this.value = value;
}

resultPairStrings = {
	resultSeq1: 0,
	resultSeq2: 0,
}

var createPairStrings = function (resultSequence1, resultSequence2) {
	this.resultSeq1 = resultSequence1;
	this.resultSeq2 = resultSequence2;
}



