outPutStructure = {
	wayMatrix: 0,
	weightMatrix: 0,
	strings: 0
}

var createStructureForOutput = function(tables, strings) {
		this.weightMatrix = tables[0];
		this.wayMatrix = tables[1];
		this.strings = strings[0];
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
	sequence1: 0,
	sequence2: 0,
}

var createPairStrings = function (resultSequence1, resultSequence2) {
	this.sequence1 = resultSequence1;
	this.sequence2 = resultSequence2;
}
var strucutureForReturnWay = {
	firstSequence: 0,
	secondSequence: 0,
	way: 0,
	x: 0,
	y: 0,
	firstResultSeq: 0,
	secondResultSeq: 0
};
var createStructureForReturnWay = function(firstSequence, secondSequence, way, x, y, firstResultSeq, secondResultSeq){
	this.firstSequence = firstSequence;
	this.secondSequence = secondSequence;
	this.way = way;
	this.x = x;
	this.y = y;
	this.firstResultSeq = firstResultSeq;
	this.secondResultSeq = secondResultSeq;
};

