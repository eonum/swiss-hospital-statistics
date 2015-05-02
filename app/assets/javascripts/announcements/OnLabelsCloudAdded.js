define([], function() {
    function OnLabelsCloudAdded(item){
        var _this = this;
        _this.item = function () {
            return item;
        };
    }
    return OnLabelsCloudAdded;
});