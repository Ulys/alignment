test("getSequences()", function(){
	var mySequences = new Object();
	var mySequences1 = new Object();
	mySequences1.value = "";
	var mySequences2 = new Object();
	mySequences2.value = "gagagc";
	var mySequences3 = new Object();
	mySequences3.value = "TROLOL";
	equal(getSequences(mySequences), 0, "Undefined value");
	equal(getSequences(mySequences1), 0, "Empty string object");
	equal(getSequences(mySequences2), "GAGAGC", "Small letters");
	equal(getSequences(mySequences3), "TROLOL", "Capital letters");
})
test("stringValidate()", function(){
	ok(stringValidate("ACGT"), "English input only nucleotids");
	ok(!stringValidate("qwer"), "English input wrong letters");
	ok(stringValidate("АСТ"), "Russian letters only nucleotids");
})