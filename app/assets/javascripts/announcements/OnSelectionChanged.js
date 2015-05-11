define([], function() {
    function OnSelectionChanged(selection) {
        var _this = this;

        _this.selection = function () {
            return selection;
        };
    }
    return OnSelectionChanged;
});