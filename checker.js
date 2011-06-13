function runBadWordLister(wordList)
{
	var badWordList = ['location', 'document'];
	var testWordArray = [];
	
	for( var i = 0; i < wordList.length; i++ )
	{

		var testWord = wordList[i].replace("'",'');
		
		testWord = testWord.replace(" ",'');
		testWord = testWord.replace("-",'');
		
		testWordArray.push(testWord);
	}

	document.write('Processing ... this may take some time.');
	processBadList(testWordArray);

	function processBadList(testArray)
	{
		var limit = 10000;
		if( testArray.length < limit )
		{
			limit = testArray.length;
		}

		for( var i = 0; i < limit; i++ )
		{
			var testWord = testArray.pop();
			if( testWord != 'location' && testWord != '' && testWord != 'document' )
			{
				try
				{
					eval('var ' + testWord + ' = {foo:1};');
					eval('var wordSuccess = ' + testWord + '.foo;');
					if( wordSuccess == undefined )
					{
						badWordList.push(testWord);
					}
				}
				catch( ex )
				{
					badWordList.push(testWord);
				}
			}
		}
		
		if( testArray.length == 0 )
		{
			showBadWordList(badWordList);
		}
		else
		{
			setTimeout(function(){processBadList(testArray)}, 500);
		}
	}

	function showBadWordList(badWordList)
	{
		document.write('<h1>Bad word list</h1>');
		document.write('<ul>');
		for( i = 0; i < badWordList.length; i++ )
		{
			document.write('<li>' + badWordList[i] + '</li>');
		}
		document.write('</ul>');
	}
}

