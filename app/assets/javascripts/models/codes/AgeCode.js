define([
    'models/abstract/CategorisedDataset'
], function(
    CategorisedDataset
) {

    function AgeCode() {
        var _this = new CategorisedDataset();

        /**
         * @returns {string}
         */
        _this.name = function() {
            return 'Age Dataset';
        };

        return _this;
    }

    AgeCode.ID = 'age';
    return AgeCode;
});