define([
    'views/widgets/CodeVisualisationCard'
],function(
    CodeVisualisationCard
){

    /**
     * @returns {CodeVisualisationCard}
     * @constructor
     * @class {DrgCodeVisualisationCard}
     * @extends {CodeVisualisationCard}
     */
    function DrgCodeVisualisationCard() {
        var _this = new CodeVisualisationCard();

        /**
         * We visualise DRG code
         * @returns {string}
         * @override
         */
        _this.codeType = function () {
            return 'drg';
        };

        return _this;
    }

    return DrgCodeVisualisationCard;

});