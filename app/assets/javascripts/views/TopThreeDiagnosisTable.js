define(['d3', 'views/ResponsiveSvg'], function (d3, ResponsiveSvg){

    function TopThreeDiagnosisTable(_width, _height){
        var _this = new ResponsiveSvg(_width, _height);

        _this.marginTop(50);
        _this.marginLeft(50);
        _this.marginRight(140);
        _this.marginBottom(50);

        _this.initialize = function(){
            //window.alert("Hello World! TopThreeDiagnosisTable is here!");
        };

        _this.initialize();
        return _this;
    }

    return TopThreeDiagnosisTable;

});
