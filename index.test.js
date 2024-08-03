const expect = chai.expect;

describe('War game', function() {
    it("deals even decks", function() {
        const deck = new Deck();
        deck.dealDeck();
        expect(player1.length).to.equal(26) && expect(player2.length).to.equal(26)
    })
}
)