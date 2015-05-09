define([
    'View',
    'helpers/CodeChooser',
    'views/widgets/LabelsCloud',
    'views/widgets/Tabulator',
    'views/widgets/TabulatorButton',
    'models/TabulatorModel'
], function(
    View,
    CodeChooser,
    LabelsCloud,
    Tabulator,
    TabulatorButton,
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

        _this.initialize = function () {
            _this.empty();
            _this.cloud(_this.newCloud());
            _this.tabulator(_this.newTabulator());
            _this.tabulatorButtons(_this.newTabulatorButtons());
            _this.initializeVisualisations(_this.tabulatorModel());
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

        _this.addButton = function (tabModel, imagePath) {
            _this.tabulatorButtons().add(_this.newButton().model(tabModel).image(imagePath));
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
            return new CodeChooser(_this.codeType(), _this.updateVisualisations);
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
            // by default do nothing
        };

        /**
         * Override to initialize visualisations. Is used to support
         * lazy initializations
         */
        _this.initializeVisualisations = function (tabulatorModel) {
            // by default do nothing
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