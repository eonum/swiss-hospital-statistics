define([
    'models/abstract/CategorisedDataset'
], function(
    CategorisedDataset
) {

    function KeCodeDataset() {
        var _this = new CategorisedDataset();

        /**
         * @returns {string}
         */
        _this.name = function() {
            return 'Ke Code Dataset';
        };

        return _this;
    }

    KeCodeDataset.ID = 'ke';
    return KeCodeDataset;
});