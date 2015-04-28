define([
    'views/widgets/CodePane'
], function(
    CodePane
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

        return _this;
    }

    return ChopCodePane;

});