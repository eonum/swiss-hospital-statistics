define([
    'views/widgets/CodePane'
], function(
    CodePane
){

    function IcdCodePane() {
        var _this = new CodePane();

        _this.newSelectorModel = override(_this, _this.newSelectorModel, function () {
            return this.super().characterRange();
        });

        _this.load = override(_this, _this.load, function(){
           return this.super('/api/v1/codes/icd');
        });

        _this.groupPrefix = function () {
            return 'icd';
        };

        return _this;
    }

    return IcdCodePane;

});