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

        _this.addButtons = function (cardPane) {
            var barChartButton = $(new View('<a href="#" class="small button secondary">Bar Chart</a>'));
            barChartButton.click(function(){cardPane.setCard("barChart")});
            content.add(new View('<li></li>').add(barChartButton));

            var ordinalCurveButton = $(new View('<a href="#" class="small button secondary">Ordinal Curve</a>'));
            ordinalCurveButton.click(function(){cardPane.setCard("ordinalCurve")});
            content.add(new View('<li></li>').add(ordinalCurveButton));

            var pieChartButton = $(new View('<a href="#" class="small button secondary">ICD Pie Chart</a>'));
            pieChartButton.click(function(){cardPane.setCard("pieChart")});
            content.add(new View('<li></li>').add(pieChartButton));
        };

        _this.addButton = function(cardPane, targetID, title){
            var button = new $(new View('<a href="#" class="small button secondary">' + title +'</a>'));
            button.click(function(){cardPane.setCard(targetID)});
            content.add(new View('<li></li>').add(button));
        };

        return _this;
    }

    return ChartChoiceButtonBar;
});