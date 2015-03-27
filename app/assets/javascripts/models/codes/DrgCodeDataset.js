define([
    'models/abstract/CategorisedDataset'
], function(
    CategorisedDataset
) {

    function DrgCodeDataset() {
        var _this = new CategorisedDataset();

        /**
         * @returns {string}
         */
        _this.name = function() {
            return 'Drg Code Dataset';
        };

        return _this;
    }

    DrgCodeDataset.ID = 'drg';
    return DrgCodeDataset;
});