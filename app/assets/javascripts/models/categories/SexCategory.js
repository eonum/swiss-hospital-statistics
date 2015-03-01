define([
    'models/abstract/AbstractCategory'
], function (
    AbstractCategory
) {

    function SexCategory() {
        var _this = new AbstractCategory();

        /**
         * @type {string}
         */
        var sex;

        /**
         * @returns {string}
         */
        _this.sex = function () {
            return sex;
        };

        /**
         * @returns {string}
         */
        _this.name = function () {
            return 'Sex category';
        };

        /**
         * @see {@link AbstractCategory.fromJSON}
         * @param {String} obj.sex
         */
        _this.fromJSON = override(_this, _this.fromJSON, function(obj){
            this.super(obj);
            sex = obj.sex;
        });

        return _this;
    }

    SexCategory.ID = 'sex';
    return SexCategory;

});