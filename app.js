// your code here!
"use strict";

$(document).ready(function() {
	
	var $formElement = $("#text-analyzer");
	
	$formElement.on('submit', function(e) {
    
    	var $userInput = $('#user-text').val(); 
    	var wordCount = getWordCount($userInput);
    	var uniqueWord = getUniqueWords($userInput);
    	var avgWord = getAverageWordLength($userInput);
    	var avgSent = getAverageSentanceLength($userInput);


    	$("dl").removeClass("hidden text-report");
    	$('.js-word-count').text(wordCount);
    	$('.js-unique-word').text(uniqueWord);
    	$('.js-avg-word').text(avgWord);
    	$('.js-avg-sent').text(avgSent);
    	
    	e.preventDefault();
  	})
});

// helper function to remove special characters from string
function cleanString(words) {
  var format = /[^\w\s\n \t]/g;
  return words.replace(format,"");
}

//helper function to create array of sentances from string
function createArraySentances(str) {
  var sentanceArray = str.split(/[.\!?\n]/g);

  var stepOneArray = sentanceArray.map(function(str){
  	return str.trim();
  });

  var cleanArray = stepOneArray.filter(function(word){
  	return word;
  });

  return cleanArray; 
}

//helper function to create a clean array of words from a string
function createArrayWords(str) {
  var wordArray = cleanString(str).toLowerCase().split(/[ ,!.";)(:-]+/);
  
  var stepOneArray = wordArray.filter(function(word){
  	return (word != "\n")
  });
  
  var cleanArray = stepOneArray.map(function(word){
  	return word.trim()
  });

  return cleanArray;
}

// function to get word count from string
function getWordCount(str) {
	return createArrayWords(str).length;
}

// function to get sentance count from string
function getSentanceCount(str) {
	return createArraySentances(str).length;
}

function getUniqueWords(str) {
	return Object.keys(wordCounter(createArrayWords(str))).length
}

function getAverageWordLength(str) {

	var cleanArray = createArrayWords(str);
	var totalChars = 0; 

	cleanArray.forEach(function(word){
		totalChars += word.length
	});

	return totalChars / getWordCount(str);
}

function getAverageSentanceLength(str) {

	return getWordCount(str) / getSentanceCount(str)
}

//helper function to create an object that counts the words
function wordCounter(wordArray) {
  var counterObject = {};
  wordArray.forEach(function(item){
    if (!counterObject.hasOwnProperty(item)) {
      counterObject[item] = 1;
    }
    else {
      counterObject[item] = counterObject[item] + 1}
    });
  return counterObject;
  }

//helper function find max value of object
function findMaxValue(obj) {
  var maxValue;
  var maxWord;
  
  for (var key in obj) {
    if (maxValue === undefined) {
      maxValue = obj[key];
      maxWord = key;
      };
    if (obj[key] > maxValue) {
      maxValue = obj[key];
      maxWord = key;      
      };
    };
  
  return maxWord;
  }
  

function mostFrequentWord(words) {
  // your code here
  // `words` is an array of strings.
  findMaxValue(wordCounter(createArray(cleanString(words))));

}

var spaceOddityText = 'Ground Control to Major Tom\n \
Ground Control to Major Tom\n \
Take your protein pills and put your helmet on\n \
Ground Control to Major Tom (ten, nine, eight, seven, six)\n \
Commencing countdown, engines on (five, four, three)\n \
Check ignition and may God\'s love be with you (two, one, liftoff)\n \
\n \
This is Ground Control to Major Tom\n \
You\'ve really made the grade\n \
And the papers want to know whose shirts you wear\n \
Now it\'s time to leave the capsule if you dare\n \
"This is Major Tom to Ground Control\n \
I\'m stepping through the door\n \
And I\'m floating in a most peculiar way\n \
And the stars look very different today\n \
For here\n \
Am I sitting in a tin can\n \
Far above the world\n \
Planet Earth is blue\n \
And there\'s nothing I can do\n'

var anotherTest = 'Hello. My name is Erin! How are you? This is pretty cool! right right right?'



console.log(getAverageSentanceLength(anotherTest))
console.log(getWordCount(anotherTest))



