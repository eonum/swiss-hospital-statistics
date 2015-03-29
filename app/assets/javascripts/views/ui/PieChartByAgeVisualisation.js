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
                    if (interval.to == "") {
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
            }

            return _this;
        };

        _this.initialize();

        return _this;
    }

    return PieChartByAgeVisualisation;
});