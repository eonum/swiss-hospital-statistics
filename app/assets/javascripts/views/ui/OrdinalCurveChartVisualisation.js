define(['View', 'views/OrdinalCurveChart'],
function(View, OrdinalCurveChart)
{
    function OrdinalCurveChartVisualisation(_width, _height){
        //var _this = this;
        var _this = new View('<div></div>');
        var content = new View('<div></div>');
        var chart = new OrdinalCurveChart(_width, _height);

        _this.initialize = function(){
            _this.append(content);
            content.append(chart);
        };

        //TODO: fetch actual data from type/code
        _this.visualiseCode = function(type, code){
            chart.setData([{interval: "0-14", amount: 5},
                {interval: "15-39", amount: 25},
                {interval: "40-69", amount: 75},
                {interval: "70+", amount: 31.3}]).setTitle("Dummy Data");
        };

        _this.initialize();

        return _this;
    }

    return OrdinalCurveChartVisualisation;
});