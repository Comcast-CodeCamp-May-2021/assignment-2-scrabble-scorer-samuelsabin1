// inspired by https://exercism.io/tracks/javascript/exercises/etl/solutions/91f99a3cca9548cebe5975d7ebca6a85

const input = require("readline-sync");

const oldPointStructure = {
  1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
  2: ['D', 'G'],
  3: ['B', 'C', 'M', 'P'],
  4: ['F', 'H', 'V', 'W', 'Y'],
  5: ['K'],
  8: ['J', 'X'],
  10: ['Q', 'Z']
};



// let userWord=[];
// let userNumber=[];

function oldScrabbleScorer(word) {

  // revisit this function
  word = word.toUpperCase();
	// word = initialPrompt()/*word*/.toUpperCase();
	let letterPoints = "";
 
	for (let i = 0; i < word.length; i++) {
 
	  for (const pointValue in oldPointStructure) {
 
		 if (oldPointStructure[pointValue].includes(word[i])) {
			letterPoints += `Points for '${word[i]}': ${pointValue}\n`
		 }
 
	  }
	}
  //test to see output

  console.log(letterPoints);
	return letterPoints;
 }

// your job is to finish writing these functions and variables that we've named //
// don't change the names or your program won't work as expected. //

//record user answers
function initialPrompt() {
   console.log("Let's play some scrabble! Enter a word:");
   word= input.question("Enter a word to score: ");
   
   return word;
}

function simpleScore(word){
  word= word.split("");
  let wordCount= 0;
 //simple loop that performs character count
  for (let i = 0; i < word.length; i++)
  {
     wordCount++;
  }
  return wordCount;
}
 

//build a scoring function out of each of these
function vowelBonusScore(word){
  //create two arrays one for consonants and another for Vowels

  const vowelPointStructure = ['A', 'E', 'I', 'O', 'U'];
  // ** We dont really need to define consonants... if you think about it, if it's NOT a vowel, then it's a consonant. So we could do this check with a simple if/else by saying that If vowelPointStructure.includes(letter) -> totalPoints +=3 else -> totalPoints +=1
  const consonantsPointStructure = ['B', 'C', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'M', 'N', 'P', 'Q', 'R', 'S', 'T', 'V', 'W', 'X', 'Y', 'Z',];
  let totalPoints = 0;
  // let the it cycle each array to match with word the user chose
  for (const letter of word.toUpperCase()){
    if (vowelPointStructure.includes(letter)){
      totalPoints += 3;
    } //manually assign the scores depending on the choice and use the same variable to compile the scores rather than 2 separate ones and later doing the math.
    if (consonantsPointStructure.includes(letter)){
      totalPoints += 1;
    }  
  }
 return totalPoints;
  
}

//build an array to store the score functions called scoringAlgorithms....probably going to abandon this idea cause its making applesauce of my brain.
const scoringAlgorithms = [
  
        simpleScoreObj = 
        {name:'Simple Score',
        description:'Each letter is worth 1 point.',
        //dont use parentheses if you are just referencing the function you only put them if you are invoking
        scorefunction: simpleScore},

        bonusVowelsObj = {name: 'Bonus Vowels',
        description:'Vowels are 3pts, consonants are 1pt.',
        scorefunction: vowelBonusScore},

        scrableObj = {name:'Scrabble',
        description:'The traditional scoring algorithm.',
        scorefunction: scrabbleScore} 
        ];


  function scorerPrompt(word) {
 // ** If you change yout number selection to a simple question of "Choose a number" then you can actualy use a console.log and a indexed for loop to iterate across the scoring array and use the properties of the objects to fill in a template literal. 
  let gameMode;
  
  
 for (let i in scoringAlgorithms){
        console.log(`${i}- ${scoringAlgorithms[i].name}: ${scoringAlgorithms[i].description}`); 
        }
        console.log("Which scoring mode would you like to use? \n");
        
        gameMode = Number(input.question("Enter 0, 1, or 2: ")); 

  while (gameMode < 0 || gameMode > 2 || isNaN(gameMode)){
    gameMode = Number(input.question("Enter 0,1, or 2: ")); 
      
  }

  console.log(`Score for '${word}' is ${scoringAlgorithms[gameMode].scorefunction(word)}`);
    


 // ** the beauty of doing it that way is that if we use this looping logic, we can just add more scoring scoringAlgorithms to the array and the system will continue to work.  
  

  // ** Same logic goes here.... if we instead of using an if/else choice here we simply use the numberSelection that the user provides to call the object directly from the scoringAlgorithms array (since the choice matches the index) then if we add new choices, we don't have to hard code this logic. 

  
  //build an if statement that triggers each function from the array depending on user selection.
}

function scrabbleScore(word){
  let scrabblePointStructure = newPointStructure;
  let totalPoints = 0;
   for (const letter of word.toUpperCase()){
     for (let key in scrabblePointStructure){
      if (key === letter){
      totalPoints += scrabblePointStructure[key]
     }
    }
  }
  return totalPoints;
}

function transform(structure) {
  //this is a 
  //build a function that flips the key names to letters and assign the numbers as the properties.
  let newStructure={};
      //need two loops to go through object and flip the key and values
  for (let points in structure){
    let list = structure[points];
    for (let i = 0; i < list.length; i++){
      newStructure[list[i]] = Number(points);

    }
      //have it reassign each key to a letter
      // newStructure= oldPointStructure.points[i]
  }
  return newStructure;

};

let newPointStructure = transform(oldPointStructure);

function runProgram() {
  console.clear();
  // create a variable for the initialPrompt since i'll be passing it around to each score function... so pretty much the system will run the word through all the functions and call the results at the end...
  let userWord = initialPrompt();
  // let wordsCounted = simpleScore();
   
   //invoke the two other functions here and push userWord inside of them
   scorerPrompt(userWord);

   // ** if you change things around a bit, and add the initialPrompt call to the scorerPrompt function, then you can add it to a while loop to handle that "while userWord !== 'stop'" case. 

   simpleScore(userWord);
   vowelBonusScore(userWord);
   scrabbleScore(userWord);
  //  console.log(newPointStructure);
}

// Don't write any code below this line //
// And don't change these or your program will not run as expected //
module.exports = {
   initialPrompt: initialPrompt,
   transform: transform,
   oldPointStructure: oldPointStructure,
   simpleScore: simpleScore,
   vowelBonusScore: vowelBonusScore,
   scrabbleScore: scrabbleScore,
   scoringAlgorithms: scoringAlgorithms,
   newPointStructure: newPointStructure,
	runProgram: runProgram,
	scorerPrompt: scorerPrompt
};

