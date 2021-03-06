define([
    'View'
], function(
    View
){

    function ChartChoiceButtonBar(cardPane){
        var _this = new View('<div class="button-bar"></div>');
        var content = new View('<ul class="button-group round"></ul>');

        _this.add(content);

        _this.addButton = function(targetID, title){
            var button = new $(new View('<a href="#" class="small button secondary">' + title +'</a>'));
            button.click(function(e){e.preventDefault(); cardPane.setCard(targetID)});
            content.add(new View('<li></li>').add(button));
        };

        return _this;
    }

    return ChartChoiceButtonBar;
});