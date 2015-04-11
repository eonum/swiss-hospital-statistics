define([
    'View', 'views/BoxPlot'
], function (
    View, BoxPlot
) {

    function BoxPlotVisualisation() {
        var _this = new View('<div></div>');
        var content = new View('<div></div>');
        var boxPlot;

        _this.initialize = function () {
            this.append(content);
            _this.class('boxPlotContainer');
        };

        _this.add = override(_this, _this.add, function(element){
            content.add(element);
            return _this;
        });

        _this.removeFromContent = function()
        {
            $(_this).remove();
        }

        /**
         * Creates this visualisation from the data provided.
         * @param data the data to update this visualisation with
         */
        _this.setData = function (data){
            var datasets = data.codes.icd.codes;
            if(datasets.length > 0) {
                var code = datasets[0].code;
                // This is the short description of the specific code from data
                var description = datasets[0].description;
                var intervals = [];

                // get total number of cases
                var sum = 0;
                for (var i = 0; i < datasets.length; i++) {
                    sum += datasets[i].categorised_data.categories.interval[0].n;
                }
                // TODO calculate the mean value

                for (var i = 0; i < datasets.length; i++) {
                    var interval = datasets[i].categorised_data.categories.interval[0];
                    var lowerQuartil = interval.categories.percentile[2];
                    var median = interval.categories.percentile[3];
                    var higherQuartil = interval.categories.percentile[4];

                    var from = interval.interval.from;
                    var to = interval.interval.to;

                    var textInterval;
                    if (_.isUndefined(to)) {
                        textInterval = from + "+";
                    } else {
                        textInterval = from + " - " + to;
                    }

                    intervals.push({key: textInterval, value: 100 * (interval.n) / sum},
                        {key: lowerQuartil, value: lowerQuartil.amount},
                        {key: median, value: median.amount},
                        {key: higherQuartil, value: higherQuartil.amount});
                }

                boxPlot = new BoxPlot().transformed(function (v) {
                    return v.toPrecision(3)
                })
                    .labeled(function (value) {
                        return (value ) + '%'
                    })
                    .openOn(intervals);

                content.empty();

                content.add('<h3>' + code + ": "+ description + '</h3>');
                content.add(boxPlot);

                // TODO: actually get colors from d3
                var colors = ["#1f77b4", "#aec7e8", "#ff7f0e",
                    "#ffbb78", "#2ca02c", "#98df8a", "#d62728", "#ff9896",
                    "#9467bd", "#c5b0d5", "#8c564b", "#c49c94", "#e377c2",
                    "#f7b6d2", "#7f7f7f", "#c7c7c7", "#bcbd22", "#17becf", "#9edae5"];

                // TODO think of something else for a Legend
                var key = '<div id="key"><ul>';
                $.each(intervals, function(index, value){
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