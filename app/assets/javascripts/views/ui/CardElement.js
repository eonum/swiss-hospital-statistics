/**
 * Cards (Card Elements) can be added to the Card Pane and be referenced by their ID, to choose for the pane
 * added which card to display.
 */
define(['View'],
function(View){

    function CardElement(id, cardContent) {
        var id = id;
        var _this = new View('<div></div>');
        var content = new View('<div></div>');

        _this.initialize = function (){
            _this.append(content);
            content.append(cardContent);
        };

        _this.getId = function(){
            return id;
        }

        _this.removeFromContent = function(){
            $(_this).remove();
        }

        _this.initialize();

        return _this;
    }

    return CardElement;

});
