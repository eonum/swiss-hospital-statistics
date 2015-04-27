define([], function(){

    function OnTabulatorAdded(tab) {
        var _this = this;

        _this.tab = function() {
            return tab;
        };
    }

    return OnTabulatorAdded;

});