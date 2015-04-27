define([],function(){
    function OnTabulatorDeselected(tab){

        var _this = this;

        _this.tab = function() {
            return tab;
        };
    }

    return OnTabulatorDeselected;
});