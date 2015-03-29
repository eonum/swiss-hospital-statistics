define([
    'View', 'views/PieChart'
], function (
    View, PieChart
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

        /**
         * Creates this visualisation from the data provided.
         * @param data the data to update this visualisation with
         */
        _this.setData = function (data){
            var datasets = data.codes.icd.codes;
            if(datasets.length > 0) {
                var description = datasets[0].description;
                var intervals = [];

                // get total number of cases
                var sum = 0;
                for (var i = 0; i < datasets.length; i++) {
                    sum += datasets[i].categorised_data.categories.interval[0].n;
                }

                for (var i = 0; i < datasets.length; i++) {
                    var interval = datasets[i].categorised_data.categories.interval[0];
                    var from = interval.interval.from;
                    var to = interval.interval.to;

                    var textInterval;
                    if (_.isUndefined(to)) {
                        textInterval = from + "+";
                    } else {
                        textInterval = from + " - " + to;
                    }

                    intervals.push({key: textInterval, value: 100 * (interval.n) / sum});
                }

                pieChart = new PieChart().transformed(function (v) {
                    return v.toPrecision(3)
                })
                    .labeled(function (value) {
                        return (value ) + '%'
                    })
                    .openOn(intervals);

                console.log(intervals);
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
                    console.log(index);
                    key += '<li style="background-color:' + colors[index] + '">' + value.key + '   Jahre</li>';
                });
                key += '</ul></div>';
                content.add(key);
            }

            return _this;
        };

        _this.initialize();

        return _this;
    }

    return PieChartByAgeVisualisation;
});