/* The first thing I did in my code to make the war game was make a class object called Card! It takes two arguments, and also sets the properties this.rank and this.suit to their respective arugements. It also establishes a method called getCardRank that we use later to get a rank for a card who's rank is a name and not a number! We've used an object literal here to give Jack the value of 11, Queen the value of 12, King the value of 13, and Ace the value of 14. Then it returns either the rankValue, or if it that didn't need to run because the card already had a numbered rank, it defaults to just play this.rank with an ||.*/


class Card {
    constructor(rank, suit) {
        this.rank = rank;
        this.suit = suit;
    }
    getCardRank() {
        const rankValues = {
            'Jack': 11,
            'Queen': 12,
            'King': 13,
            'Ace': 14,
        };
        return rankValues[this.rank] || this.rank;
    }
}
/* This right here is our Deck class which also has a few of its own methods! The class itself takes no arguments, but sets the this.cards property to an empty array, and use the initializeDeck function as a method to create all the cards.*/
class Deck {
    constructor() {
        this.cards = [];
        this.initializeDeck();
    }
    initializeDeck() { /* Here I've created the method initializeDeck and set the variable suits to an array with all the suit names, and a variable called ranks to an array with all the ranks of the cards. Then using a for loop inside of a for loop to iterate through each rank inside of each suit, pushed a new instance of the Card object with each rank and suit into the empty array this.cards!*/

        const suits = ['Hearts', 'Clubs', 'Diamonds', 'Spades'];
        const ranks = [2, 3, 4, 5, 6, 7, 8, 9, 10, 'Jack', 'Queen,', 'King', 'Ace'];

        for (let suit of suits) {
            for (let rank of ranks) {
                this.cards.push(new Card(rank, suit))
            }
        }
    }
    
    /* Here I've created a method called shuffleDeck that shuffles all the cards in the existing deck using the Fisher-Yates Shuffle!*/
    shuffleDeck() {
        let currentIndex = this.cards.length;

        while (currentIndex != 0) {
            let randomIndex = Math.floor(Math.random() * currentIndex)
            currentIndex--;

            [this.cards[currentIndex], this.cards[randomIndex]] = [
                this.cards[randomIndex], this.cards[currentIndex]];
        }
    }
    /* This method I created so that it would deal the cards into two seperate arrays, one for player1 and one for player2! I did this be using a for loop to iterate through the this.cards array and if the remainder each index was 0 after dividing by 2, then it would go into the player1 array, if not the player2 array!*/
    dealDeck(){
        const player1 = [];
        const player2 = [];
        for (let i = 0; i < this.cards.length; i++) {
            if (i % 2 === 0) {
                player1.push(this.cards[i]);
            } else {
                player2.push(this.cards[i]);
            }
        }

        return { player1, player2 }; /* Gotta make sure to return these arrays so they can be used!*/
    }
}
/* This is the last class in my code! Its the Game class, and it tells the computer how to run the game with all the cards! It takes a property this.deck and sets its value to a new instance of the Deck class! This automatically initializes the deck because thats just one of the properties of the Deck class. Then our Game class creates two empty arrays for the players decks. And sets each players score to 0.*/
class Game {
    constructor() {
        this.deck = new Deck();
        this.player1 = [];
        this.player2 = [];
        this.player1score = 0;
        this.player2score = 0;
    }
/* This is the method that starts the game off! It shuffles the deck, and deals to each players hand! */
    initializeGame() {
        this.deck.shuffleDeck();
        const {player1, player2} = this.deck.dealDeck();
        this.player1 = player1;
        this.player2 = player2;
    }
    /* This method tells us how to execute each turn. Creating variables that are equal to whatever i is in our forloop, and setting the cardvalue of to the player1card.getcardrank method! Then using an if else statement, gives whichever player had a better rank on their card a point, and announces the score!*/
    playTurn() {
        for(let i = 0; i < this.player1.length; i++) {
            const player1Card = this.player1[i];
            const player2Card = this.player2[i];

            const player1CardValue = player1Card.getCardRank();
            const player2CardValue = player2Card.getCardRank();

            if (player1CardValue > player2CardValue) {
                this.player1score++;
                console.log(`Player 1 scored a point by beating Player 2's ${player2Card.rank} of ${player2Card.suit} with their ${player1Card.rank} of ${player1Card.suit}. The score is now ${this.player1score} to ${this.player2score}!`)
            } else if (player1CardValue < player2CardValue) {
                this.player2score++;
                console.log(`Player 2 scored a point by beating Player 1's ${player1Card.rank} of ${player1Card.suit} with their ${player2Card.rank} of ${player2Card.suit}. The score is now ${this.player1score} to ${this.player2score}!`)
            } else {
                console.log(`Both players played the same card! No points for anyone! The score is still ${this.player1score} to ${this.player2score}!`)
            }
            
        }
    }
/* This method is used to determine who wins once all the turns have been completed!*/
    determineWinner() {
        if (this.player1score > this.player2score) {
            return `Player 1 wins by ${this.player1score - this.player2score}`;
        } else if (this.player2score > this.player1score) {
            return `Player 2 wins by ${this.player2score - this.player1score}`;
        } else {
            return `Its a complete draw!`
        }
    }

    /* This is the playGame method that actually runs all of the above code to make the game run. First it runs initializeGame(), then runs playTurn(), then it sets the winner variable to the called function determineWinner, and then console logs the winner!*/
    playGame() {
        this.initializeGame();
        this.playTurn();
        const winner = this.determineWinner();
        console.log(`Player 1 scored ${this.player1score} and Player 2 scored ${this.player2score}`);
        console.log(winner);
    }
}

/* Here we create a new instance of the object Game in the variable game, and then run the method game.playGame() and it all runs perfectly!!!*/
const game = new Game();
game.playGame();