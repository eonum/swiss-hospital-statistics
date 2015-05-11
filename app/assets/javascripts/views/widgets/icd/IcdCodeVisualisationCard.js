define([
    'views/widgets/CodeVisualisationCard'
],function(
    CodeVisualisationCard
){
    /**
     * @returns {CodeVisualisationCard}
     * @constructor
     * @class {IcdCodeVisualisationCard}
     * @extends {CodeVisualisationCard}
     */
    function IcdCodeVisualisationCard() {
        var _this = new CodeVisualisationCard();

        /**
         * We visualise ICD code
         * @returns {string}
         * @override
         */
        _this.codeType = function () {
            return 'icd';
        };

        return _this;
    }

    return IcdCodeVisualisationCard;

});