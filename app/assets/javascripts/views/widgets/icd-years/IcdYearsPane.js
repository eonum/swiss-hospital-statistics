define([
    'View',
    'views/widgets/icd-years/IcdYearsSelector',
    'models/IcdYearsModel'
], function(
    View,
    IcdYearsSelector,
    IcdYearsModel
){

    function IcdYearsPane() {
        var _this = new View('<div class="icd_years"></div>');

        var model;
        var selectorView;

        /**
         * Create dom elements here
         */
        _this.initialize = function () {
            model = _this.newModel();
            model.years(_.range(2003, 2015));
            model.ages(['0-14', '15-39','40-69','70+']);

            selectorView = _this.newSelectorView();
            selectorView.model(model);
            _this.add(selectorView);
        };

        _this.newModel = function () {
            return new IcdYearsModel();
        };

        _this.newSelectorView = function () {
            return new IcdYearsSelector();
        };

        /**
         * Is called once when user first time opens tab.
         * Should start visualisation process here
         */
        _this.load = function () {
            return _this;
        };

        _this.initialize();

        return _this;
    }

    return IcdYearsPane;
});