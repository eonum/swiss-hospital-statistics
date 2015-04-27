define([], function() {
    function OnSearchProcessorFiltered(candidates) {
        var _this = this;

        _this.candidates = function () {
            return candidates;
        };
    }

    return OnSearchProcessorFiltered;
});