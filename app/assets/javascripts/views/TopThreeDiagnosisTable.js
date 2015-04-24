define(['d3', 'views/ResponsiveSvg', 'views/ui/HospitalTypeButtonBar'], function (d3, ResponsiveSvg, HospitalTypeButtonBar){

    function TopThreeDiagnosisTable(_width, _height){

        //Expected JSON-format: {"interval": val, "total": val, "male": val, "female": val}

        var _this = new ResponsiveSvg(_width, _height);

        var TRANSITION_TIME = 1000;
        var titleFontSize = _height / 20;
        var chartHeight = _height - titleFontSize;

        var hospitalTypeButtons = new HospitalTypeButtonBar();

        _this.append(hospitalTypeButtons);

        _this.marginTop(50);
        _this.marginLeft(50);
        _this.marginRight(140);
        _this.marginBottom(50);

        _this.initialize = function(){
            _this.svg().append("text")
                .attr("id", "title")
                .style("font-size", titleFontSize + "px");

            _this.setTitle("Empty Table");
        };

        _this.setTitle = function(text){
            _this.svg().select("#title")
                .transition()
                .duration(TRANSITION_TIME)
                .text(text);

            return _this;
        };

        _this.initialize();
        return _this;
    }

    return TopThreeDiagnosisTable;

});
