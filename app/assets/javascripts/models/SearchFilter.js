define([], function(){

    function SearchFilter() {
        var _this = this;

        /**
         * The most simple filter, just matches substring
         * @param string
         * @param query
         * @returns {boolean}
         */
        _this.isMatches = function (string, query) {
            return string.indexOf(query) > -1
        };
    }

    return SearchFilter;

});