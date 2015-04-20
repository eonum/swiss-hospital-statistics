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

        /**
         * Adds a card to the cards collection. Does NOT yet display card.
         *
         * @param card card to be added
         */
        _this.addCard = function(card){
            cards.push(card);

            //set first added card as default
            if(cards.length == 1)
                _this.setCard(card.getId());
        };

        /**
         * Displays card with given ID. Card with given ID must be in cards collection (see addCard()).
         *
         * @param cardID ID of card to be displayed
         */
        _this.setCard = function(cardID){
            if(currentCardIndex >= 0)
                cards[currentCardIndex].remove();
            currentCardIndex = getCardIndexById(cardID);
            var currentCard = cards[currentCardIndex];
            content.append(currentCard);
        };

        //walks through cards collection and returns array index of card wih given id
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
