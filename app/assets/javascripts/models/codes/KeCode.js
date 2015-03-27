define([
    'models/abstract/CategorisedDataset'
], function(
    CategorisedDataset
) {

    function KeCode() {
        var _this = new CategorisedDataset();

        /**
         * @returns {string}
         */
        _this.name = function() {
            return 'Ke Code Dataset';
        };

        return _this;
    }

    KeCode.ID = 'ke';
    return KeCode;
});