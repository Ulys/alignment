var calculateSequences = function(firstSequence, secondSequence) {
		var Sequence1 = firstSequence;
		var Sequence2 = secondSequence;
		var SequanceArray1 = [];
		var SequanceArray2 = [];
		
		SequanceArray1 = Sequence1.split('');
		SequanceArray1.unshift('_');
		SequanceArray1.unshift("Symbols");
		SequanceArray2 = Sequence2.split('');
		SequanceArray2.unshift('_');

		var SubSeqMatrix = matrixGenerate (SequanceArray1, SequanceArray2);
		var WayMatrix = matrixGenerate (SequanceArray1, SequanceArray2);
		
		//Ініціюємо перший рядок і стовпець матриць
		for (var i = 1; i < Sequence2.length+2; i++) {
			for (var j = 1; j < Sequence1.length+2; j++) {
				if (i==1) {
					SubSeqMatrix[i][j]=0; 
					WayMatrix[i][j]='left'
				} 
				else if (i>1 && j==1) {
					SubSeqMatrix[i][j]=0; 
					WayMatrix[i][j]='up'
				}; 
			};
		};

		//Розраховуємо матрицю ваг-префіксів
		for (var i = 2; i < Sequence2.length+2; i++) {
			for (var j = 2; j < Sequence1.length+2; j++) {
				var first = SubSeqMatrix[i-1][j]-2;
				if (SequanceArray1[j]==SequanceArray2[i-1]) {
					var second = SubSeqMatrix[i-1][j-1]+1
				} 
				else {
					var second = SubSeqMatrix[i-1][j-1]-1
				};
				var third = SubSeqMatrix[i][j-1]-2;
				SubSeqMatrix[i][j] = Math.max(first,second,third);
		       //Паралельно заповнимо матрицю шляху       
			    if (SubSeqMatrix[i][j] == first) {WayMatrix[i][j] = 'up'};
			    if (SubSeqMatrix[i][j] == third) {WayMatrix[i][j] = 'left'};
			    if (SubSeqMatrix[i][j] == second) {WayMatrix[i][j] = 'diag'};	

			};
		};        		
		// Побудова вирівнювання
		var ResultSequence1 = '';
		var ResultSequence2 = '';
		var i = WayMatrix.length;
		var j = WayMatrix[0].length;
		while (i>1 && j>1) {
			if (WayMatrix[i-1][j-1] == 'up') {
				ResultSequence1 = '_' + ResultSequence1;
				ResultSequence2 = WayMatrix[i-1][0] + ResultSequence2;
				i = i - 1;
			}
			else {
				if (WayMatrix[i-1][j-1] == 'left') {
					ResultSequence1 = WayMatrix[0][j-1] + ResultSequence1;
					ResultSequence2 = '_' + ResultSequence2;
					j = j - 1;
				}
				else {
					ResultSequence1 = WayMatrix[0][j-1] + ResultSequence1;
					ResultSequence2 = WayMatrix[i-1][0] + ResultSequence2;
					i = i - 1;
					j = j - 1;
				};    
			};
		};

	};