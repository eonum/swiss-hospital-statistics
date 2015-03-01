define([
    'models/abstract/AbstractCode',
    'models/abstract/CategorisedData',
], function(
    AbstractCode,
    CategorisedData
) {

    function CategorisedCode () {
        var _this = new AbstractCode();

        /**
         * @returns {string}
         */
        _this.name = function() {
            return 'Categorised Code';
        };

        /**
         * @param {Number} year
         * @returns {CategorisedData}
         */
        _this.newData = function (year) {
            return new CategorisedData(year);
        };

        return _this;
    }
    return CategorisedCode;
});