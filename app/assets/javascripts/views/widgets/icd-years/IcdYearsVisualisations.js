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

            converter.convert(selection, function(result) {
                console.log("MALE");
                console.log(result.man);
                console.log("FEMALE");
                console.log(result.woman);

                // mapping for compatibility with PieChart
                _.each(result.woman, function(value, key) {
                    data_man.push({interval: key, amount: value});

                });
                _.each(result.man, function(value, key) {
                    data_woman.push({interval: key, amount: value});

                });
            });


            pieChart = new PieChart(300,300);
            pieChart.openOn(data_woman);

            // update visualisations
            // dummy update

            //_this.visualiseWomanChart(arrayTester, woman);
            _this.newWomanChart().openOn(pieChart);
            _this.manChart().html(JSON.stringify(data_woman));
        };

        /**
         * Returns new chart, a subclass of ResponsiveSvg subclass, that is used to visualise women
         * @returns {ResponsiveSvg|View}
         */
        _this.newWomanChart = function () {

            //var womanView = new View('<div height: 500px></div>');
            var pieChart = new PieChart(300, 300);

            // Even when I try to add dummy data I get errors in d3.js but I modelled the data
            // exactly like the entity given to PieChart by the other function (ICD Code -> PieChart)
            var arrayTester = [{"I": 10},{"II": 40},{"III": 20},{"IV": 25},{"V": 5}];

            // pieChart.labeled("Tester Lable");
            // pieChart.openOn(arrayTester);


            return pieChart;
            //return woman;

            return new View('<div style="background: #ff69b4; height: 500px"></div>');
        };

        /**
         * Returns new chart, a subclass of ResponsiveSvg subclass, that is used to visualise men
         * @returns {ResponsiveSvg|View}
         */
        _this.newManChart = function () {

            //var manView = new View('<div height: 500px></div>');
            //var pieChart = new PieChart(_width, _height);
            //pieChart.openOn();
            //return pieChart;

            return new View('<div style="background: #88d0fc; height: 500px"></div>');
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