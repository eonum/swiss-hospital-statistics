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
            var barChartButton = $(new View('<a href="#" class="small button secondary">Bar Chart</a>'));
            barChartButton.click(function(){alert("Theoretically, there would be a Bar Chart now...")});
            content.add(new View('<li></li>').add(barChartButton));

            var ordinalCurveButton = $(new View('<a href="#" class="small button secondary">Ordinal Curve</a>'));
            ordinalCurveButton.click(function(){alert("Theoretically, there would be an Ordinal Curve Chart now...")});
            //ordinalCurveButton.click(function(){$(this).parent().remove()});
            content.add(new View('<li></li>').add(ordinalCurveButton));

            var pieChartButton = $(new View('<a href="#" class="small button secondary">Pie Chart</a>'));
            pieChartButton.click(function(){alert("Theoretically, there would be a Pie Chart now...")});
            content.add(new View('<li></li>').add(pieChartButton));
        };

        _this.addButtons();

        return _this;
    }

    return ChartChoiceButtonBar;
});