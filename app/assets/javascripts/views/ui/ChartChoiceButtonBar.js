define([
    'View'
], function(
    View
){

    function ChartChoiceButtonBar(){
        var _this = new View('<div class="button-bar"></div>');
        var content = new View('<ul class="button-group round"></ul>');
        var buttonIDs = [];
        var buttonTitles = [];
        var buttons = [];

        _this.add(content);

        _this.addButton = function(cardPane, targetID, title){
            var button = new $(new View('<a href="#" class="small button secondary">' + title +'</a>'));
            button.click(function(){cardPane.setCard(targetID)});
            content.add(new View('<li></li>').add(button));
        };

        return _this;
    }

    return ChartChoiceButtonBar;
});