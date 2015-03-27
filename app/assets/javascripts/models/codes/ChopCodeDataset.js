define([
    'models/abstract/CategorisedDataset'
], function(
    CategorisedDataset
) {

    function ChopCodeDataset() {
        var _this = new CategorisedDataset();

        /**
         * @returns {string}
         */
        _this.name = function() {
            return 'Chop Code Dataset';
        };

        return _this;
    }

    ChopCodeDataset.ID = 'chop';
    return ChopCodeDataset;
});