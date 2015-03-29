define([
    'models/abstract/AbstractDataset',
    'models/abstract/CategorisedData',
], function(
    AbstractDataset,
    CategorisedData
) {

    function CategorisedDataset () {
        var _this = new AbstractDataset();

        /**
         * @returns {string}
         */
        _this.name = function() {
            return 'Categorised Dataset';
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