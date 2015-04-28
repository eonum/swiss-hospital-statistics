define([
    'views/widgets/CodePane',
    'views/widgets/ChopCodeVisualisationCard'
], function(
    CodePane,
    ChopCodeVisualisationCard
){

    function ChopCodePane() {
        var _this = new CodePane();

        _this.newSelectorModel = override(_this, _this.newSelectorModel, function () {
            return this.super().numeralRange();
        });

        _this.load = override(_this, _this.load, function(){
           return this.super('/api/v1/codes/chop');
        });

        _this.groupPrefix = function () {
            return 'chop';
        };

        _this.newCodeCard = function () {
            return new ChopCodeVisualisationCard();
        };

        return _this;
    }

    return ChopCodePane;

});