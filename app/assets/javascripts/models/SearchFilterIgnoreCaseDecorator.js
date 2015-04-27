define([
    'models/SearchFilterDecorator'
], function(
    SearchFilterDecorator
){
    function SearchFilterIgnoreCaseDecorator(_filter) {
        var _this = new SearchFilterDecorator(_filter);

        _this.isMatches = override(_this, _this.isMatches, function(string, query){
            return this.super(string.toLowerCase(), query.toLowerCase());
        });

        return _this;
    }

    return SearchFilterIgnoreCaseDecorator;
});