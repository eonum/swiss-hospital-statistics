define([
    'View'
], function(
    View
){

    function ChartChoiceButtonBar(){
        var _this = new View('<div class="button-bar"></div>');
        var content = new View('<ul class="button-group round"></ul>');
        _this.add(content);

        _this.addButtons = function (cardPane) {
            var barChartButton = $(new View('<a href="#" class="small button secondary">Bar Chart</a>'));
            barChartButton.click(function(){cardPane.setCard("barChart")});
            content.add(new View('<li></li>').add(barChartButton));

            var ordinalCurveButton = $(new View('<a href="#" class="small button secondary">Ordinal Curve</a>'));
            ordinalCurveButton.click(function(){cardPane.setCard("ordinalCurve")});
            content.add(new View('<li></li>').add(ordinalCurveButton));
        };

        return _this;
    }

    return ChartChoiceButtonBar;
});