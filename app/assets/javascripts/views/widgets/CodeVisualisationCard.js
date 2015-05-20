define([
    'View',
    'helpers/CodeChooser',
    'views/widgets/LabelsCloud',
    'views/widgets/Tabulator',
    'views/widgets/TabulatorButton',
    'views/ui/BarChartVisualisation',
    'views/ui/OrdinalCurveChartVisualisation',
    'views/ui/BoxPlotVisualisation',
    'models/TabulatorModel'
], function(
    View,
    CodeChooser,
    LabelsCloud,
    Tabulator,
    TabulatorButton,
    BarChartVisualisation,
    OrdinalCurveChartVisualisation,
    BoxPlotVisualisation,
    TabulatorModel
){
    /**
     *
     * @returns {View}
     * @constructor
     * @class {CodeVisualisationCard}
     */
    function CodeVisualisationCard () {
        var _this = new View('<div class="code-visualisations"></div>');

        var codeChooser;
        var model;
        var cloud;
        var tabulator;
        var tabulatorModel;
        var tabulatorButtons;

        var visualisations = {};

        _this.initialize = function () {
            _this.empty();
            _this.cloud(_this.newCloud());
            _this.tabulator(_this.newTabulator());
            _this.tabulatorButtons(_this.newTabulatorButtons());
            _this.initializeVisualisations(_this.tabulatorModel());
            _this.initializeDefaultVisualisations();
        };

        _this.isInitialized = function () {
            if (_.isUndefined(_this.tabulator()))
                return false;
            return _this.tabulator().parent().length;
        };

        _this.cloud = function (_cloud) {
            if (_.isUndefined(_cloud)) return cloud;
            cloud = _cloud;
            cloud.model(model);
            _this.add(cloud);
            return _this;
        };

        _this.tabulator = function(_tabulator) {
            if (_.isUndefined(_tabulator)) return tabulator;
            tabulatorModel = _this.newTabulatorModel();
            tabulatorModel.beNotLazy();
            tabulator = _tabulator;
            tabulator.styled(function(tab){tab.duration(0)}).model(tabulatorModel);
            _this.add(tabulator);
            return _this;
        };

        _this.tabulatorModel = function () {
            return tabulatorModel;
        };

        _this.codeChooser = function () {
            if (_.isUndefined(codeChooser))
                codeChooser = _this.newCodeChooser();
            return codeChooser;
        };

        _this.visualisations = function () {
            return visualisations;
        };

        _this.addButton = function (tabModel, imagePath) {
            _this.tabulatorButtons().add(_this.newButton().model(tabModel).image(imagePath));
        };

        /**
         * @param {Object} settings
         * @param {Object} settings.name
         * @param {Object} settings.chart
         * @param {String} settings.icon
         * @param {boolean} [settings.isSelected]
         * @param {Function} [settings.onSelected]
         */
        _this.addVisualisation = function (settings) {
            var chart = settings.chart;
            _this.visualisations()[settings.name] = chart;
            var tab = _this.tabulatorModel().newTab();
            tab.name(settings.name);
            tab.render(function(){ return chart });

            tab.onSelected(function(){ chart.onSelected() });

            if (!_.isUndefined(settings.onSelected))
                tab.onSelected(settings.onSelected);

            _this.tabulatorModel().add(tab);
            chart.codeType(_this.codeType());
            chart.tab(tab);
            chart.model(_this.model());

            if (!_.isUndefined(settings.isSelected) && settings.isSelected)
                tab.select();

            _this.addButton(tab, settings.icon);
            return tab;
        };

        _this.tabulatorButtons = function (_tabulatorButtons) {
            if (_.isUndefined(_tabulatorButtons)) return tabulatorButtons;
            tabulatorButtons = _tabulatorButtons;
            _this.add(tabulatorButtons);
            return _this;
        };

        _this.model = function(_model) {
            if (_.isUndefined(_model)) return model;
            model = _model;
        };

        _this.on = function (type, code) {
            if (!_this.isInitialized())
                _this.initialize();
            _this.codeChooser().fetchDatasets(type, code, _this.updateVisualisations);
        };

        /*-------------------------------------------------------------*/
        /*------------ U S E F U L   T O   O V E R R I D E ------------*/
        /*-------------------------------------------------------------*/

        /**
         * Override if you want to return any custom code chooser
         * @returns {CodeChooser}
         */
        _this.newCodeChooser = function () {
            return new CodeChooser(_this.codeType());
        };

        _this.newCloud = function () {
            return new LabelsCloud();
        };

        _this.newTabulator = function() {
            return new Tabulator();
        };

        _this.newTabulatorModel = function() {
            return new TabulatorModel();
        };

        _this.newTabulatorButtons = function () {
            return new TabulatorButtons();
        };

        _this.newButton = function() {
            return new Button();
        };

        _this.newBarChart = function () {
            return new BarChartVisualisation();
        };

        _this.newOrdinalChart = function () {
            return new OrdinalCurveChartVisualisation();
        };

        _this.newBoxPlotChart = function () {
            return new BoxPlotVisualisation();
        };

        /**
         * Override to define code type like:
         * "icd", "chop", "drg".
         * @returns {string}
         */
        _this.codeType = function () {
            return 'unknown';
        };

        /**
         * Override to define which presentation to update
         * @param code
         * @param datasets
         */
        _this.updateVisualisations = function(code, datasets){
            _.each(_this.visualisations(), function(each){
                each.update(code, datasets);
            });
        };

        /**
         * Override to initialize visualisations. Is used to support
         * lazy initializations
         */
        _this.initializeVisualisations = function (tabulatorModel) {
            // by default do nothing
        };

        _this.initializeDefaultVisualisations = function () {
            _this.addVisualisation({
                name: 'bar',
                icon: 'chart-bar.png',
                chart: _this.newBarChart(),
                isSelected: true
            });

            _this.addVisualisation({
                name: 'ordinal',
                icon: 'chart-line.png',
                chart: _this.newOrdinalChart()
            });

            _this.addVisualisation({
                name: 'box',
                icon: 'chart-plot.png',
                chart: _this.newBoxPlotChart()
            });
        };

        return _this;
    }

    function TabulatorButtons() {
        return new View('<ul class="inline-list chart-buttons"></ul>');
    }

    function Button() {
        var _this = new TabulatorButton();

        var image;

        _this.renderLink = override(_this, _this.renderLink, function () {
            image = _this.newImage();
            this.super();
            _this.link().add(_this.image());
        });

        _this.label = function () {
            // no label
        };

        _this.image = function(_imageName) {
            if (_.isUndefined(_imageName)) return image;
            _this.image().attr('src','images/'+_imageName);
            return _this;
        };

        _this.newImage = function () {
            return new View('<img>');
        };


        return _this;
    }

    return CodeVisualisationCard;
});