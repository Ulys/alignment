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
	
});
test("stringValidate()", function(){
	ok(stringValidate("ACGT"), "English input only nucleotids");
	ok(!stringValidate("qwer"), "English input wrong letters");
	ok(stringValidate("АСТ"), "Russian letters only nucleotids");
});
test("findStratPoints() with one maximum in column", function(){
  // array 9 % 6, max {i = 6, j = 6, value = 12}
 	var table1 = [[0,1,2,1,1,12,2,1,2], [0,1,2,1,1,12,2,1,2], [0,1,2,1,1,12,2,1,2], [0,1,2,1,1,12,2,1,2], [0,1,2,1,1,12,2,1,2], [0,1,2,1,1,12,2,1,2]];
	var result = findStartPoints(table1);
	equal(result.length, 1, "check length");
	equal(result[0].i, 6, "check coordinate i");
	equal(result[0].j, 6, "check coordinat j");
	equal(result[0].value, 12, "check value");
})
test("findStratPoints() with one maximum in row", function(){
  // array 9 % 6, max {i = 9, j = 3, value = 7}
 	var table1 = [[0,1,2,1,1,12,2,1,2], [0,1,2,1,1,12,2,1,2], [0,1,2,1,1,12,2,1,7], [0,1,2,1,1,12,2,1,2], [0,1,2,1,1,12,2,1,2], [0,1,2,1,1,0,2,0,2]];
	var result = findStartPoints(table1);
	equal(result.length, 1, "check length");
	equal(result[0].i, 9, "check coordinate i");
	equal(result[0].j, 3, "check coordinat j");
	equal(result[0].value, 7, "check value");
})
test("findStratPoints() with two maximum in column", function(){
  // array 9 % 6, max {i = 6, j = 6, value = 7}, {i = 9, j = 6, value = 7}
 	var table1 = [[0,1,2,1,1,12,2,1,2], [0,1,2,1,1,12,2,1,2], [0,1,2,1,1,12,2,1,2], [0,1,2,1,1,192,2,1,2], [0,1,2,1,1,12,2,1,2], [0,1,2,1,1,7,2,1,7]];
	var result = findStartPoints(table1);
	equal(result.length, 2, "check length");
	test("first", function(){
	//	max {i = 6, j = 6, value = 7}
		equal(result[0].i, 6, "check coordinate i");
		equal(result[0].j, 6, "check coordinat j");
		equal(result[0].value, 7, "check value");
	});
	test("second", function(){
	//	max {i = 6, j = 6, value = 7}
		equal(result[1].i, 9, "check coordinate i");
		equal(result[1].j, 6, "check coordinat j");
		equal(result[1].value, 7, "check value");
	});
})


