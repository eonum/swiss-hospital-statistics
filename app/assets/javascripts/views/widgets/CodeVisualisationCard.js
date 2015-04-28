define([
    'View',
    'views/ui/CardPane',
    'views/ui/ChartChoiceButtonBar',
    'helpers/CodeChooser'
], function(
    View,
    CardPane,
    ChartChoiceButtonBar,
    CodeChooser
){
    /**
     *
     * @returns {View}
     * @constructor
     * @class {CodeVisualisationCard}
     */
    function CodeVisualisationCard () {
        var _this = new View('<div></div>');

        var chooseButtons;
        var cardPane;
        var codeChooser;

        _this.initialize = function () {
            _this.empty();

            cardPane = _this.newCardPane();
            chooseButtons = _this.newChartChoiceButtonBar();
            _this.append(chooseButtons);
            _this.append(cardPane);
            _this.initializeVisualisations();
        };

        _this.isInitialized = function () {
            if (_.isUndefined(_this.cardPane()))
                return false;
            return _this.cardPane().parent().length;
        };

        /**
         * @returns {View}
         */
        _this.cardPane = function () {
            return cardPane;
        };

        _this.chooseButtons = function () {
            return chooseButtons;
        };

        _this.codeChooser = function () {
            if (_.isUndefined(codeChooser))
                codeChooser = _this.newCodeChooser();
            return codeChooser;
        };

        _this.addCard = function (card) {
            _this.cardPane().addCard(card);
        };

        _this.addButton = function (targetID, title) {
            _this.chooseButtons().addButton(targetID, title);
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

        _this.newCardPane = function () {
            return new CardPane();
        };

        _this.newChartChoiceButtonBar = function () {
            return new ChartChoiceButtonBar(_this.cardPane());
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
        _this.initializeVisualisations = function () {
            // by default do nothing
        };

        return _this;
    }

    return CodeVisualisationCard;
});