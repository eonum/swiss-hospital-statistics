define([
    'models/abstract/CategorisedDataset'
], function(
    CategorisedDataset
) {

    function ChopCode() {
        var _this = new CategorisedDataset();

        /**
         * @returns {string}
         */
        _this.name = function() {
            return 'Chop Code Dataset';
        };

        return _this;
    }

    ChopCode.ID = 'chop';
    return ChopCode;
});