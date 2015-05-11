define([
    'View',
    'views/widgets/Selector',
    'views/widgets/icd-years/IcdYearsVisualisations',
    'models/SelectorModel'
], function(
    View,
    Selector,
    IcdYearsVisualisations,
    SelectorModel
){

    function IcdYearsPane() {
        var _this = new View('<div class="icd_years"></div>');

        var model;
        var selectorView;
        var visualisations;

        /**
         * Create dom elements here
         */
        _this.initialize = function () {
            model = _this.newModel();
            model.add('years').items(_.range(2003, 2014)).beMultiple();
            model.add('ages').items(['0-14', '15-39','40-69','70+']).beMultiple();

            selectorView = _this.newSelectorView();
            selectorView.model(model);
            _this.add(selectorView);

            visualisations = _this.newVisualisations();
            visualisations.model(model);
            _this.add(visualisations);
        };

        _this.visualisations = function () {
            return visualisations;
        };

        _this.model = function () {
            return model;
        };

        _this.newModel = function () {
            return new SelectorModel();
        };

        _this.newSelectorView = function () {
            return new Selector();
        };

        _this.newVisualisations = function () {
            return new IcdYearsVisualisations();
        };

        /**
         * Is called once when user first time opens tab.
         * Should start visualisation process here
         */
        _this.load = function () {
            _this.visualisations().invalidate();
            return _this;
        };

        _this.initialize();

        return _this;
    }

    return IcdYearsPane;
});