define([], function() {
    function OnLabelsCloudRemoved(item){
        var _this = this;
        _this.item = function () {
            return item;
        };
    }
    return OnLabelsCloudRemoved;
});