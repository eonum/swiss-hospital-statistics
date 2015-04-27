define([],function(){
    function OnTabulatorSelected(tab){

        var _this = this;

        _this.tab = function() {
            return tab;
        };
    }

    return OnTabulatorSelected;
});