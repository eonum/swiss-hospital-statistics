define([
    'models/abstract/CategorisedDataset'
], function(
    CategorisedDataset
) {

    function IcdCodeDataset() {
        var _this = new CategorisedDataset();


        /**
         * @returns {string}
         */
        _this.name = function() {
            return 'Icd Code Dataset';
        };

        return _this;
    }

    IcdCodeDataset.ID = 'icd';
    return IcdCodeDataset;
});