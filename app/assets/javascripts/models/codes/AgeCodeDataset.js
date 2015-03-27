define([
    'models/abstract/CategorisedDataset'
], function(
    CategorisedDataset
) {

    function AgeCodeDataset() {
        var _this = new CategorisedDataset();

        /**
         * @returns {string}
         */
        _this.name = function() {
            return 'Age Code Dataset';
        };

        return _this;
    }

    AgeCodeDataset.ID = 'age';
    return AgeCodeDataset;
});