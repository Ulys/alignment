test("getSequences()", function(){
	var mySequences1 = new Object();
	var mySequences2 = new Object();
	mySequences2.value = "";
	var mySequences3 = new Object();
	mySequences3.value = "gagagc";
	var mySequences4 = new Object();
	mySequences4.value = "TROLOL";
	equals(getSequences(mySequences1), 0, "Undefined object");
	equals(getSequences(mySequences2), 0, "Empty string object");
	equals(getSequences(mySequences3), "GAGAGC", "Small letters");
	equals(getSequences(mySequences4), "TROLOL", "Capital letters");
})