define([
    'View', 'views/PieChart', 'helpers/converters/NumberByAgeDatasetConverter'
], function (
    View, PieChart, NumberByAgeDatasetConverter
) {

    function PieChartByAgeVisualisation(_width, _height) {
        var _this = new View('<div></div>');
        var content = new View('<div></div>');
        var pieChart = new PieChart(_width, _height);

        _this.initialize = function () {
            _this.append(content);
            content.append(pieChart);

            pieChart.key('interval')
                .value('amount')
                .transformed(function (v) {
                    return v.toPrecision(3)
                });
        };

        _this.add = override(_this, _this.add, function(element){
            content.add(element);
            return _this;
        });

        _this.visualiseData = function(description, datasets){
            var converter = new NumberByAgeDatasetConverter(datasets);
            var intervals = converter.asAbsoluteData();
            pieChart.openOn(intervals);
            pieChart.setTitle(description);
        };

        _this.initialize();

        return _this;
    }

    return PieChartByAgeVisualisation;
});