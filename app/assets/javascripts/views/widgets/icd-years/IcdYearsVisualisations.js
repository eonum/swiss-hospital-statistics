define([
    'View',
    'announcements/OnIcdAgesDeselected',
    'announcements/OnIcdAgesSelected',
    'announcements/OnIcdYearsDeselected',
    'announcements/OnIcdYearsSelected',
    'helpers/converters/ChaptersByYearConverter',
    'views/PieChart'
], function(
    View,
    OnIcdAgesDeselected,
    OnIcdAgesSelected,
    OnIcdYearsDeselected,
    OnIcdYearsSelected,
    ChaptersByYearConverter,
    PieChart
){

    function IcdYearsVisualisations() {
        var _this = new View('<div class="row full-width"></div>');
        var converter = new ChaptersByYearConverter();

        var man;
        var woman;
        var model;

        /*--------- V I S U A L I S A T I O N S ---------*/
        _this.update = function (selection) {
            var data_man = [];
            var data_woman = [];
            var tmp_man = [];
            var tmp_woman = [];
            var normalizer = selection.years.length*selection.ages.length;

            console.log("normalizer: " + normalizer);

            converter.convert(selection, function(result) {
                console.log("MALE");
                console.log(result.man);
                console.log("FEMALE");
                console.log(result.woman);

                if(normalizer != 0) {
                    _.map(result.woman, function (value, key) {
                        return value/normalizer;
                    });
                    _.each(result.man, function (value) {
                        value = value/normalizer;
                    });
                    console.log("MALE 22");
                    console.log(result.man);
                    console.log("FEMALE 22");
                    console.log(result.woman);
                }

                var minEventsMan = 0;
                _.filter(result.man, function(num) {
                    if(num < 5) {
                        minEventsMan += num;
                    }
                });
                console.log("minEventsMan" + minEventsMan);
                var minEventsFemale = 0;
                minEventsFemale += _.filter(result.female, function(num) {
                    return num < 5;
                });
                console.log("minEventsFemale" + minEventsFemale);

// TODO refactor
                // mapping for compatibility with PieChart
                _.each(result.woman, function(value, key) {
                    value = Math.round(value*100)/100;
                    if(value > 5) {
                        value = value/normalizer;
                        data_man.push({interval: key, amount: value});
                    }
                });
                _.each(result.man, function(value, key) {
                    value = Math.round(value*100)/100;
                    if(value > 5) {
                        value = value/normalizer;
                        data_woman.push({interval: key, amount: value});
                    }
                });

                _this.womanChart().openOn(data_woman);
                _this.manChart().openOn(data_man);
            });



        };

        /**
         * Returns new chart, a subclass of ResponsiveSvg subclass, that is used to visualise women
         * @returns {ResponsiveSvg|View}
         */
        _this.newWomanChart = function () {
            var pieChart = new PieChart(800, 500);
            pieChart.key('interval').value('amount').labeled(function(amount) {
                return Math.round(amount*100)/100;
            });
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
            var left = _this.newColumn();
            var right = _this.newColumn();
            left.add(woman);
            right.add(man);
            _this.add(left);
            _this.add(right);
        };

        _this.manChart = function () {
            return man;
        };

        _this.womanChart = function () {
            return woman;
        };

        _this.newColumn = function () {
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