define([
    'views/widgets/CodePane',
    'views/widgets/drg/DrgCodeVisualisationCard'
], function(
    CodePane,
    DrgCodeVisualisationCard
){

    function DrgCodePane() {
        var _this = new CodePane();

        _this.newSelectorModel = override(_this, _this.newSelectorModel, function () {
            return this.super();
        });

        _this.load = override(_this, _this.load, function(){
           return this.super('/api/v1/codes/drg');
        });

        /**
         * @param candidate
         * @param {string} candidate.code
         * @param {string} candidate.text_de;
         * @returns {string}
         */
        _this.candidateNameOf = function (candidate) {
            return candidate.code + " "+candidate.text_de;
        };

        _this.groupPrefix = function () {
            return 'drg';
        };

        _this.newCodeCard = function () {
            return new DrgCodeVisualisationCard();
        };

        return _this;
    }

    return DrgCodePane;

});