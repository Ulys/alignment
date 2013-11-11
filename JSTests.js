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
  // array 9 * 6, max {i = 6, j = 6, value = 12}
 	var table1 = [[0,1,2,1,1,12,2,1,2],
 				 [ 0,1,2,1,1,12,2,1,2],
 				 [ 0,1,2,1,1,22,2,1,2], 
 				 [ 0,1,2,1,1,2,2,1,2],
 				 [ 0,1,2,1,1,4,2,1,2],
 				 [ 0,1,2,1,1,1,2,12,2]];
	var result = findStartPoints(table1);
	equal(result.length, 1, "check length_1");
	equal(result[0].length, 1, "check length_2");
	equal(result[0][0].i, 5, "check coordinate i");
	equal(result[0][0].j, 7, "check coordinat j");
	equal(result[0][0].value, 12, "check value");
})
test("findStratPoints() with one maximum in row", function(){
  // array 9 * 6, max {i = 7, j = 2, value = 7}
 	var table1 = [[0,1,2,1,1,12,2,1,2],
 				 [ 0,1,2,1,1,12,2,1,2],
 				 [ 0,1,2,1,1,12,2,1,7],
 				 [ 0,1,2,1,1,12,2,1,2], 
 				 [ 0,1,2,1,1,12,2,1,2], 
 				 [ 0,1,2,1,1, 0,2,0,2]]; 
	var result = findStartPoints(table1);
	equal(result.length, 1, "check length_1");
	equal(result[0].length, 1, "check length_2");
	equal(result[0][0].i, 2, "check coordinate i");
	equal(result[0][0].j, 8, "check coordinat j");
	equal(result[0][0].value, 7, "check value");
})
test("findStratPoints() with two maximum in column", function(){
  // array 9 * 6, max {i = 6, j = 6, value = 7}, {i = 9, j = 6, value = 7}
 	var table1 = [[0,1,2,1,1,12,2,1,2], 
 				 [ 0,1,2,1,1,12,2,1,2], 
 				 [ 0,1,2,1,1,12,2,1,2], 
 				 [ 0,1,2,1,1,19,2,1,2],
 				 [ 0,1,2,1,1,12,2,1,2], 
 				 [ 0,1,2,1,7, 3,2,7,2]]; 
	var result = findStartPoints(table1);
	equal(result.length, 1, "check length_1");
	equal(result[0].length, 2, "check length_2");
	test("first", function(){
	//	max {i = 6, j = 6, value = 7}
		equal(result[0][0].i, 5, "check coordinate i");
		equal(result[0][0].j, 4, "check coordinat j");
		equal(result[0][0].value, 7, "check value");
	});
	test("second", function(){
	//	max {i = 6, j = 6, value = 7}
		equal(result[0][1].i, 5, "check coordinate i");
		equal(result[0][1].j, 7, "check coordinat j");
		equal(result[0][1].value, 7, "check value");
	});
})


