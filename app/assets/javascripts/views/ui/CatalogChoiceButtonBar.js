define([
    'View'
], function(
    View
){

    function CatalogChoiceButtonBar(){
        var _this = new View('<div class="button-bar"></div>');
        var content = new View('<ul class="button-group round"></ul>');

        _this.add(content);

        _this.addButton = function(codeName, callback){
            var button = new $(new View('<a href="#" class="small button secondary">' + codeName +'</a>'));
            button.click(callback);
            content.add(new View('<li></li>').add(button));
        };

        return _this;
    }

    return CatalogChoiceButtonBar;
});