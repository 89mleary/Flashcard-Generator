var inquirer = require("inquirer");

var createdCards = [];

function promptFlashcard() {

	inquirer
	  .prompt([
	    {
	      type: "list",
	      message: "What would you like to do?\n",
	      choices: ["Create a BASIC card", "Create a CLOZE card", "View cards"],
	      name: "flashresponse"
	    }
	  ])
	  .then(function(inquirerResponse) {

	  	if (inquirerResponse.flashresponse === "Create a BASIC card") {

	  		createBasic();

	  	}

	  	if (inquirerResponse.flashresponse === "Create a CLOZE card") {

	  		createCloze();

	  	}

	  	if (inquirerResponse.flashresponse === "View cards") {

	  		displayCards();

	  	}

	  });

}


// Basic card creation functions
function BasicCard(front, back) {

	this.front = front;
	this.back = back;
	this.type = "b";

}

function createBasic() {

	inquirer
	  .prompt([
	    {
	      type: "input",
	      message: "Font of card: ",
	      name: "front"
	    },
	    {
	      type: "input",
	      message: "Back of card: ",
	      name: "back"
	    }
	  ])
	  .then(function(inquirerResponse) {

	  	createdCards.push(new BasicCard(inquirerResponse.front, inquirerResponse.back));
	  	console.log("\nBASIC card created!\n");
	  	promptFlashcard();
	  });

}


// Cloze card creation functions
function createCloze() {

	inquirer
	  .prompt([
	    {
	      type: "input",
	      message: "Cloze:",
	      name: "cloze"
	    },
	    {
	      type: "input",
	      message: "Rest of text:",
	      name: "rest"
	    }
	  ])
	  .then(function(inquirerResponse) {

	  	createdCards.push(new ClozeCard(inquirerResponse.rest, inquirerResponse.cloze));
	  	console.log("\nCLOZE card created!\n");
	  	promptFlashcard();
	  });

}

function ClozeCard(text, cloze) {

	this.cloze = cloze;
	this.partial = "..." + text;
	this.full = cloze + " " + text;
	this.type = "c";

}


// Displays all cards that have been created
function displayCards() {

	if (createdCards.length === 0) {
		console.log("\nNo flashcards to display. Please create some!\n");
		promptFlashcard();
	} else {
		for (var card = 0; card < createdCards.length; card++) {

			if (createdCards[card].type === "b") {
				console.log("-- Card " + (card+1) + " --");
				console.log("Front:\t" + createdCards[card].front);
				console.log("Back:\t" + createdCards[card].back);
				console.log("");
			}
			if (createdCards[card].type === "c") {
				console.log("-- Card " + (card+1) + " --");
				console.log("Cloze:\t" + createdCards[card].cloze);
				console.log("Rest:\t" + createdCards[card].partial);
				console.log("Full:\t" + createdCards[card].full);
				console.log("");
			}
		}
		promptFlashcard();
	}

}


// Initial user prompt
promptFlashcard();