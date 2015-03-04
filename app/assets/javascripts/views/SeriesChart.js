define(['d3', 'views/abstract/AbstractSeriesChart'], function (d3, AbstractSeriesChart) {

    /**
     * @returns {*|jQuery|HTMLElement}
     * @constructor
     * @class PieChart
     */
    function SeriesChart(_width, _height){
        var _this = new AbstractSeriesChart(_width, _height);

        var scripting = {
            dataLogic: function(serie) {return serie[_this._dataSymbol()]},
            colorLogic: d3.scale.category10(),
            displayLogic: function (entity) { return entity; },
            labelLogic: function (serie) { return _this._nameOf(serie) },
            valueTransformedLogic: function(value) { return value },
            keyTransformedLogic: function(value) { return value },
            keyLabeledLogic: function (key) {return key},
            valueLabeledLogic: function (value) {return value},
            serieNameLogic: function(serie) { return serie[_this._serieSymbol()] },

            keySymbol: 'key',
            valueSymbol: 'value',
            dataSymbol: 'data',
            serieSymbol: 'serie',
            yAxisName: 'axis'
        };

        _this._dataSymbol = function () { return scripting.dataSymbol };
        _this._serieSymbol = function () { return scripting.serieSymbol };
        _this._keySymbol = function() { return scripting.keySymbol };
        _this._valueSymbol = function() { return scripting.valueSymbol };
        _this._yAxisName = function () { return scripting.yAxisName };
        _this._colorOf = function(serie) { return scripting.colorLogic(_this._nameOf(serie)) };
        _this._nameOf = function(serie) { return scripting.serieNameLogic(serie) };
        _this._labelOf = function(serie) { return scripting.labelLogic(serie) };
        _this._valueOf = function (entry) { return scripting.valueTransformedLogic(entry[_this._valueSymbol()]) };
        _this._keyOf = function (entry) { return scripting.keyTransformedLogic(entry[_this._keySymbol()]) };
        _this._dataOf = function(serie) {return scripting.dataLogic(serie)};
        _this._keyLabelOf = function (key) {return scripting.keyLabeledLogic(key)};
        _this._valueLabelOf = function (value) {return scripting.valueLabeledLogic(value)};


        /* ------------ S C R I P T I N G   A P I ------------ */
        _this.openOn = function (entity) {
            _this.initialize(scripting.displayLogic(entity));
            return _this;
        };

        _this.display = function (displayLogic) {
            scripting.displayLogic = displayLogic;
            return _this;
        };

        _this.labeled = function (_labelLogic) {
            scripting.labelLogic = _labelLogic;
            return _this;
        };

        _this.yAxis = function (yAxisName) {
            scripting.yAxisName = yAxisName;
            return _this;
        };

        _this.key = function (keySymbol) {
            scripting.keySymbol = keySymbol;
            return _this;
        };

        _this.value = function (valueSymbol) {
            scripting.valueSymbol = valueSymbol;
            return _this;
        };

        _this.colored = function (_function) {
            scripting.colorLogic = _function;
            return _this;
        };

        _this.valueTransformed = function (_function) {
            scripting.valueTransformedLogic = _function;
            return _this;
        };

        _this.keyTransformed = function (_function) {
            scripting.keyTransformedLogic = _function;
            return _this;
        };

        _this.keyLabeled = function (_function) {
            scripting.keyLabeledLogic = _function;
            return _this;
        };

        _this.valueLabeled = function (_function) {
            scripting.valueLabeledLogic = _function;
            return _this;
        };

        return _this;
    }

    return SeriesChart;

});