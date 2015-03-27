define([
    'models/abstract/CategorisedDataset'
], function(
    CategorisedDataset
) {

    function IcdCode() {
        var _this = new CategorisedDataset();


        /**
         * @returns {string}
         */
        _this.name = function() {
            return 'Icd Code Dataset';
        };

        return _this;
    }

    IcdCode.ID = 'icd';
    return IcdCode;
});