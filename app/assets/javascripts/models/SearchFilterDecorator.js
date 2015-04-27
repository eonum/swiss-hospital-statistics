define([], function() {

    function SearchFilterDecorator(_filter) {
        var _this = this;
        var filter = _filter;

        _this.filter = function () {
            return filter;
        };

        _this.isMatches = function(string, query) {
            return _this.filter().isMatches(string, query);
        };
    }

    return SearchFilterDecorator;
});