define([
    'View',
    'announcements/OnIcdAgesDeselected',
    'announcements/OnIcdAgesSelected',
    'announcements/OnIcdYearsDeselected',
    'announcements/OnIcdYearsSelected',
    'helpers/converters/ChaptersByYearConverter',
    'views/PieChart',
    'views/LegendChart'
], function(
    View,
    OnIcdAgesDeselected,
    OnIcdAgesSelected,
    OnIcdYearsDeselected,
    OnIcdYearsSelected,
    ChaptersByYearConverter,
    PieChart,
    LegendChart
){

    function IcdYearsVisualisations() {
        var _this = new View('<div class="row full-width"></div>');
        var converter = new ChaptersByYearConverter();

        var man;
        var woman;
        var legend;
        var model;

        /*--------- V I S U A L I S A T I O N S ---------*/
        _this.update = function (selection) {
            var data_man = [];
            var data_woman = [];
            var normalizer = selection.years.length*selection.ages.length;

            converter.convert(selection, function(result) {
                console.log("MALE");
                console.log(result.man);
                console.log("FEMALE");
                console.log(result.woman);

                var minEventsWoman = 0;
                var minEventsMan = 0;

                _.each(result.woman, function(value, key) {

                    value = value/normalizer;
                    if(value > 5) {
                        value = Math.round(value*100)/100;
                        data_woman.push({interval: key, amount: value});
                    } else {
                        minEventsWoman += value;
                    }
                });
                data_woman = _.sortBy(data_woman, 'amount').reverse();
                minEventsWoman = Math.round(minEventsWoman*100)/100;
                data_woman.push({interval: "Rest", amount: minEventsWoman});

                _.each(result.man, function(value, key) {

                    value = value/normalizer;
                    if(value > 5) {
                        value = Math.round(value*100)/100;
                        data_man.push({interval: key, amount: value});
                    } else {
                        minEventsMan += value;
                    }
                });
                data_man = _.sortBy(data_man, 'amount').reverse();
                minEventsMan = Math.round(minEventsMan*100)/100;
                data_man.push({interval: "Rest", amount: minEventsMan});

                if(normalizer > 0) {
                    _this.womanChart().openOn(data_woman);
                    _this.manChart().openOn(data_man);
                    _this.legendChart();
                }
            });
        };

        /**
         * Returns new chart, a subclass of ResponsiveSvg subclass, that is used to visualise women
         * @returns {ResponsiveSvg|View}
         */
        _this.newWomanChart = function () {
            var pieChart = new PieChart(800, 500);
            pieChart.key('interval').value('amount');
            return pieChart;
        };

        /**
         * Returns new chart, a subclass of ResponsiveSvg subclass, that is used to visualise men
         * @returns {ResponsiveSvg|View}
         */
        _this.newManChart = function () {
            var pieChart = new PieChart(800, 500);
            pieChart.key('interval').value('amount');
            return pieChart;
        };

        _this.newLegendChart = function() {
            var legendChart = new LegendChart(100, 500);
            return legendChart;
        }

        /*------------------------------------------------*/

        _this.model = function(_model) {
            if (_.isUndefined(_model)) return model;
            model = _model;
            model.announcer().onSendTo(OnIcdAgesDeselected, _this.invalidate, _this);
            model.announcer().onSendTo(OnIcdAgesSelected, _this.invalidate, _this);
            model.announcer().onSendTo(OnIcdYearsDeselected, _this.invalidate, _this);
            model.announcer().onSendTo(OnIcdYearsSelected, _this.invalidate, _this);
            _this.render();
            return _this;
        };

        _this.render = function () {
            woman = _this.newWomanChart();
            man = _this.newManChart();
            legend = _this.newLegendChart();
            var left = _this.newColumn();
            var middle = _this.newColumn();
            var right = _this.newLegend();
            left.add(woman);
            middle.add(man);
            right.add(legend);
            _this.add(left);
            _this.add(middle);
            _this.add(right);
        };

        _this.manChart = function () {
            return man;
        };

        _this.womanChart = function () {
            return woman;
        };

        _this.legendChart = function () {
            return legend;
        };

        _this.newColumn = function () {
            return new View('<div class="columns large-6"></div>');
        };

        _this.newLegend = function() {
            return new View('<div class="columns large-6"></div>');
        };

        // calls the selection method of IcdYearsModel which returns a JSON
        // of two arrays selectedYears and selectedAges
        _this.invalidate = function() {
            _this.update(_this.model().selection());
        };

        return _this;
    }

    return IcdYearsVisualisations;

});