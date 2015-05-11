define([
    'views/widgets/CodeVisualisationCard'
],function(
    CodeVisualisationCard
){

    /**
     * @returns {CodeVisualisationCard}
     * @constructor
     * @class {ChopCodeVisualisationCard}
     * @extends {CodeVisualisationCard}
     */
    function ChopCodeVisualisationCard() {
        var _this = new CodeVisualisationCard();

        /**
         * We visualise CHOP code
         * @returns {string}
         * @override
         */
        _this.codeType = function () {
            return 'chop';
        };

        return _this;
    }

    return ChopCodeVisualisationCard;

});