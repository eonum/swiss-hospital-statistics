define([
    'View'
], function(
    View
){

    function CodeButtonBarView(){
        var _this = new View('<div class="button-bar"></div>');
        var content = new View('<ul class="button-group round"></ul>');
        _this.add(content);

        var types;

        /**
         * @param {Array.<Class>} _types
         */
        _this.setTypes = function (_types) {
            types = _types;
            _this.initialize();
        };

        _this.initialize = function () {
            content.empty();
            _.each(types, function (each){
                _this.addButton(each);
            });
        };

        _this.addButton = function (type) {
            var link = new View('<a href="#" class="small button secondary">'+type.ID+'</a>');
            content.add(new View('<li></li>').add(link));
            link.model(type);
        };

        return _this;
    }

    return CodeButtonBarView;
});