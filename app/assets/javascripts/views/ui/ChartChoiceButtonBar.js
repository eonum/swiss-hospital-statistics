define([
    'View'
], function(
    View
){

    function ChartChoiceButtonBar(){
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

        /*_this.addButton = function (type) {
            var link = new View('<a href="#" class="small button secondary">'+type.ID+'</a>');
            content.add(new View('<li></li>').add(link));
            link.model(type);
        };*/

        _this.addButtons = function () {
            var button1 = new View('<a href="#" class="small button secondary">Bar Chart</a>');
            content.add(new View('<li></li>').add(button1));

            var button1 = new View('<a href="#" class="small button secondary">Ordinal Curve</a>');
            content.add(new View('<li></li>').add(button1));

            var button1 = new View('<a href="#" class="small button secondary">Pie Chart</a>');
            content.add(new View('<li></li>').add(button1));
        };

        _this.addButtons();

        return _this;
    }

    return ChartChoiceButtonBar;
});