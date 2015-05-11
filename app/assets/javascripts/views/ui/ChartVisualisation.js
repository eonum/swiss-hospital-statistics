define([
    'View'
], function(
    View
){
    function ChartVisualisation(){
        var _this = new View('<div></div>');

        var chart;
        var model;
        var tab;
        var codeType;

        _this.defaultWidth = function () {
            return 1024;
        };

        _this.defaultHeight = function () {
            return 390;
        };

        _this.chart = function () {
            return chart;
        };

        _this.codeType = function(type) {
            if (_.isUndefined(type)) return codeType;
            codeType = type;
            return _this;
        };

        _this.model = function (_model) {
            if (_.isUndefined(_model)) return model;
            model = _model;
            _this.render();
            return _this;
        };

        _this.tab = function (_model) {
            if (_.isUndefined(_model)) return tab;
            tab = _model;
            return _this;
        };

        _this.render = function () {
            chart = _this.newChart();
            _this.initializeChart(_this.chart());
            _this.add(chart);
        };

        _this.newChart = function () {
            throw 'Subclass responsibility'
        };

        _this.initializeChart = function (chart) {
            // to be implemented
        };

        _this.update = function(code, datasets) {
            // to be implemented
        };

        _this.onSelected = function() {
            _this.chart().update();
        };

        return _this;
    }

    return ChartVisualisation;
});