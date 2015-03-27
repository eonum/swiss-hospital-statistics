define([
    'models/abstract/AbstractDataset',
    'models/abstract/CategorisedData',
], function(
    AbstractCode,
    CategorisedData
) {

    function CategorisedDataset () {
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
    return CategorisedDataset;
});