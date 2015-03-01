define([
    'models/abstract/AbstractCategory'
], function (AbstractCategory) {

    function KeKantonStatisticCategory() {
        var _this = new AbstractCategory();

        /** @type {String} */
        var kantonCode;
        var cesareanPercent;
        /** @type {Number} */
        var averageAge;
        /** @type {Number} */
        var averageCesareanAge;

        /**
         * @returns {String}
         */
        _this.kantonCode = function () {
            return kantonCode;
        };

        /**
         * @returns {Number}
         */
        _this.cesareanPercent = function () {
            return cesareanPercent;
        };

        /**
         * @returns {Number}
         */
        _this.averageAge = function () {
            return averageAge;
        };

        /**
         * @returns {Number}
         */
        _this.averageCesareanAge = function () {
            return averageCesareanAge;
        };

        /**
         * @returns {string}
         */
        _this.name = function () {
            return 'KE Kanton';
        };

        _this.fromJSON = override(_this, _this.fromJSON,
            /**
             * @param {String} obj.code
             * @param {Number} obj.cesareansPercent
             * @param {Number} obj.age;
             * @param {Number} obj.cesareanAge
             */
            function (obj){
                this.super();
                kantonCode = obj.code;
                cesareanPercent = obj.cesareansPercent;
                averageAge = obj.age;
                averageCesareanAge = obj.cesareanAge
        });

        /**
         * @type {Object}
         */
        _this.asJSON = override(_this, _this.asJSON, function(){
            return _.extend(this.super(), {
                code : _this.kantonCode(),
                cesareansPercent : _this.cesareanPercent(),
                age : _this.averageAge(),
                cesareanAge : _this.averageCesareanAge()
            });
        });

        return _this;
    }

    KeKantonStatisticCategory.ID = 'ke_kanton';
    return KeKantonStatisticCategory;
});