define([
    'd3',
    'views/ResponsiveSvg',
    'views/ui/HospitalTypeButtonBar'
], function (
    d3,
    ResponsiveSvg,
    HospitalTypeButtonBar
){

    function TopThreeDiagnosisTable(_width, _height){

        var _this = new ResponsiveSvg(_width, _height);

        var TRANSITION_TIME = 1000;
        var titleFontSize = _height / 20;
        var chartHeight = _height - titleFontSize;
        var topOffset = 80; //TODO another magic number...
        var leftOffset = 100;

        var hospitalTypeButtons = new HospitalTypeButtonBar();

        _this.append(hospitalTypeButtons);

        _this.marginTop(50);
        _this.marginLeft(30);
        _this.marginRight(140);
        _this.marginBottom(50);

        var xScale = d3.scale.ordinal().rangeBands([0, _width]);
        var yScale = d3.scale.ordinal().rangeBands([0, chartHeight]);

        _this.initialize = function(){
            _this.svg().append("text")
                .attr("id", "title")
                .attr("y", 35)
                .style("font-size", titleFontSize + "px");

            _this.setTitle("Nine majestic pink boxes in their natural habitat");
        };

        _this.setTitle = function(text){
            _this.svg().select("#title")
                .transition()
                .duration(TRANSITION_TIME)
                .text(text);

            return _this;
        };

        _this.setData = function(data){

            var boxHeight = _height/3;
            var boxWidth = _width/3;
            var padding = 30;

            var hardCodedY = 200;

            var xDomain = [0,1,2]; //TODO: eliminate magic numbers, same for yDomain
            xScale.domain(xDomain);

            var yDomain = [0,1,2];
            yScale.domain(yDomain);

            var boxGroup = _this.svg().selectAll("g")
                .data(data)
                .enter().append("g");

            this.svg().append("text")
                .attr("x", 100)
                .attr("y", 70)
                .text("Total");

            this.svg().append("text")
                .attr("x", 250)
                .attr("y", 70)
                .text("Male");

            this.svg().append("text")
                .attr("x", 500)
                .attr("y", 70)
                .text("Female");

            this.svg().append("text")
                .attr("x", _this.marginLeft())
                .attr("y", 70)
                .text("0-14");

            this.svg().append("text")
                .attr("x", _this.marginLeft())
                .attr("y", 130)
                .text("15-39");

            this.svg().append("text")
                .attr("x", _this.marginLeft())
                .attr("y", 250)
                .text("40-69");



            boxGroup.append("rect")//TODO: loads of magic numbers here...
                .attr("x", function(d, i) {return xScale(i%3) + leftOffset})
                .attr("y", function(d, i) { return yScale((Math.floor(i/3))) + topOffset})
                .attr("height", function(d) { return boxHeight - (padding/2) })
                .attr("width", function(d) { return boxWidth - (padding/2) })
                .style("fill", function(d) { return "pink" });

            boxGroup.append("text")
                .attr("x", function(d, i) { return xScale(i%3) + (boxWidth/2) + leftOffset - (padding/2)})
                .attr("y", function(d, i) { return yScale((Math.floor(i/3))) + (boxHeight/2) + topOffset})
                .style('font-size', '20px')
                .attr('class', 'light-font')
                .attr('text-anchor', 'middle')
                .attr('fill', "black")
                .text(function(d) { return d.name });
        };

        _this.initialize();
        return _this;
    }

    return TopThreeDiagnosisTable;

});
