define([
    'View', 'views/PieChart', 'helpers/converters/NumberByAgeDatasetConverter'
], function (
    View, PieChart, NumberByAgeDatasetConverter
) {

    function PieChartByAgeVisualisation() {
        var _this = new View('<div></div>');
        var content = new View('<div></div>');
        var pieChart;

        _this.initialize = function () {
            this.append(content);
            _this.class('pieChartContainer');
        };

        _this.add = override(_this, _this.add, function(element){
            content.add(element);
            return _this;
        });

        _this.removeFromContent = function()
        {
            $(_this).remove();
        }

        _this.visualiseData = function(description, datasets){
            var converter = new NumberByAgeDatasetConverter(datasets);
            var intervals = converter.asAbsoluteData();

            pieChart = new PieChart()
                .key('interval')
                .value('amount')
                .transformed(function (v) {
                    return v.toPrecision(3)
                })
                .labeled(function (value) {
                    return (value ) + '%'
                })
                .openOn(intervals);

            content.empty();

            content.add('<h3>' + description + '</h3>');
            content.add(pieChart);

            // TODO: actually get colors from d3
            var colors = ["#1f77b4", "#aec7e8", "#ff7f0e",
                "#ffbb78", "#2ca02c", "#98df8a", "#d62728", "#ff9896",
                "#9467bd", "#c5b0d5", "#8c564b", "#c49c94", "#e377c2",
                "#f7b6d2", "#7f7f7f", "#c7c7c7", "#bcbd22", "#17becf", "#9edae5"];

            var key = '<div id="key"><ul>';
            $.each(intervals, function(index, value){
                key += '<li style="background-color:' + colors[index] + '">' + value.interval + '   Jahre</li>';
            });
            key += '</ul></div>';
            content.add(key);
        };

        _this.initialize();

        return _this;
    }

    return PieChartByAgeVisualisation;
});