define([
    'models/abstract/CategorisedDataset'
], function(
    CategorisedDataset
) {

    function DrgCode() {
        var _this = new CategorisedDataset();

        /**
         * @returns {string}
         */
        _this.name = function() {
            return 'Drg Code Dataset';
        };

        return _this;
    }

    DrgCode.ID = 'drg';
    return DrgCode;
});