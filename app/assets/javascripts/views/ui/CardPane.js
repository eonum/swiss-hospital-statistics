/**
 * Represents a View, providing functionality for adding card elements (cards) and choosing and displaying of added
 * cards.
 */
define(['View'],
function(View){

    function CardPane() {
        var _this = new View('<div></div>');
        var content = new View('<div></div>');

        var currentCardIndex = -1;
        var cards = [];

        _this.initialize = function (){
            _this.append(content);
        };

        _this.addCard = function(card){
            cards.push(card);
        };

        _this.setCard = function(cardID){
            if(currentCard >= 0)
                cards[currentCardIndex].removeFromContent();
            currentCardIndex =  getCardIndexById(cardID);
            var currentCard = cards[currentCardIndex];
            content.append(currentCard);
        };

        function getCardIndexById(cardID){
            for(var i=0; i<cards.length; i++)
                if(cards[i].getId() == cardID){ //TODO: does "==" check for equality or identity in JavaScript...? Seems to work like equality
                    return i;
                }
        };

        _this.initialize();

        return _this;
    }

    return CardPane;
});
