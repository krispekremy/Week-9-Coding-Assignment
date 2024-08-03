const expect = chai.expect;

describe('War game', function() {
    it("Make sure after deck is split both players have even number of cards", function() {
        const deck = new Deck();
        let playerDecks = deck.dealDeck();
        expect(playerDecks.player1.length).to.equal(playerDecks.player2.length)
        })
    })