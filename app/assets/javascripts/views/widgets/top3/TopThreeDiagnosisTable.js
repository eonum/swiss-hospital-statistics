define([
    'd3',
    'views/ResponsiveSvg',
    'views/ui/HospitalTypeButtonBar',
    'View'
], function (
    d3,
    ResponsiveSvg,
    HospitalTypeButtonBar,
    View
){

    //function TopThreeDiagnosisTable(_width, _height){
    //
    //    var _this = new ResponsiveSvg(_width, _height);
    //
    //    var TRANSITION_TIME = 1000;
    //    var NUM_OF_COLS = 3;
    //    var BOX_PADDING = 30;
    //    var titleFontSize = _height / 20;
    //    var chartHeight = _height - titleFontSize;
    //
    //
    //    var topOffset = 80; //TODO: magic offset
    //    var leftOffset = 100; //TODO: magic offset
    //
    //    /* Note: maybe try eliminating magic offsets with classes and margin */
    //
    //    var hospitalTypeButtons = new HospitalTypeButtonBar();
    //
    //    _this.append(hospitalTypeButtons);
    //
    //    _this.marginTop(50);
    //    _this.marginLeft(30);
    //    _this.marginRight(140);
    //    _this.marginBottom(50);
    //
    //    var xScale = d3.scale.ordinal().rangeBands([0, _width]);
    //    var yScale = d3.scale.ordinal().rangeBands([0, chartHeight]);
    //
    //    _this.initialize = function(){
    //        _this.svg().append("text")
    //            .attr("id", "title")
    //            .attr("y", 35)//TODO: magic number
    //            .style("font-size", titleFontSize + "px");
    //
    //        _this.setTitle("Top Drei Diagnosen");
    //    };
    //
    //    _this.setTitle = function(text){
    //        _this.svg().select("#title")
    //            .transition()
    //            .duration(TRANSITION_TIME)
    //            .text(text);
    //
    //        return _this;
    //    };
    //
    //    _this.setData = function(data, year, hospitalType){
    //        _this.setTitle("Top Drei Diagnosen, " + year + ", " + hospitalType);
    //
    //        var numOfRows = data.length / NUM_OF_COLS;
    //
    //        var boxHeight = _height/numOfRows;
    //        var boxWidth = _width/ NUM_OF_COLS;
    //
    //        var xDomain = [];
    //        for(var i=0; i<(NUM_OF_COLS); i++)
    //            xDomain.push(i);
    //        xScale.domain(xDomain);
    //
    //        var yDomain = [];
    //        for(var i=0; i<(data.length/NUM_OF_COLS); i++)
    //            yDomain.push(i);
    //        yScale.domain(yDomain);
    //
    //
    //        var boxGroup = _this.svg().selectAll("g")
    //            .data(data)
    //            .enter().append("g");
    //
    //         /*
    //        this.svg().append("text")
    //            .attr("x", 100)
    //            .attr("y", 70)
    //            .text("Total");
    //
    //        this.svg().append("text")
    //            .attr("x", 250)
    //            .attr("y", 70)
    //            .text("Male");
    //
    //        this.svg().append("text")
    //            .attr("x", 500)
    //            .attr("y", 70)
    //            .text("Female");
    //
    //        this.svg().append("text")
    //            .attr("x", _this.marginLeft())
    //            .attr("y", 70)
    //            .text("0-14");
    //
    //        this.svg().append("text")
    //            .attr("x", _this.marginLeft())
    //            .attr("y", 130)
    //            .text("15-39");
    //
    //        this.svg().append("text")
    //            .attr("x", _this.marginLeft())
    //            .attr("y", 250)
    //            .text("40-69");
    //        */
    //
    //
    //        boxGroup.append("rect")
    //            .attr("x", function(d, i) {return xScale(i%NUM_OF_COLS) + leftOffset})
    //            .attr("y", function(d, i) { return yScale((Math.floor(i/numOfRows))) + topOffset})
    //            .attr("height", function(d) { return boxHeight - (BOX_PADDING/2) })
    //            .attr("width", function(d) { return boxWidth - (BOX_PADDING/2) })
    //            .style("fill", function(d) { return "pink" });
    //
    //        boxGroup.append("text")
    //            .attr("x", function(d, i) { return xScale(i%NUM_OF_COLS) + (boxWidth/2) + leftOffset - (BOX_PADDING/2)})
    //            .attr("y", function(d, i) { return yScale((Math.floor(i/numOfRows))) + (boxHeight/2) + topOffset})
    //            .style('font-size', '20px')
    //            .attr('class', 'light-font')
    //            .attr('text-anchor', 'middle')
    //            .attr('fill', "black")
    //            .text(function(d) { return d.name });
    //    };
    //
    //    _this.initialize();
    //    return _this;
    //}

    function TopThreeDiagnosisTable(_width, _height){
        var _this = new View('<div></div>');

        var table = $("<table/>");

        //TODO: translation
        var categories = ["Total", "Männer", "Frauen"];
        var intervals = ["0-14", "15-39", "40-69", "70+", "Total"];

        var tableHeader = $("<tr/>").append($("<th/>"));
        categories.forEach(function(interval){tableHeader.append($("<th/>").text(interval))});
        table.append(tableHeader);


        _this.initialize = function() {
            _this.append(table);
        };

        //TODO: refactoring
        _this.setData = function(data){
            for(var i=0; i<data.length; i++) {
                var row = $("<tr/>");
                table.append(row);
                var interval = intervals[i];
                console.log(interval);
                row.append(($("<th/>").text(intervals[i])));

                data[i].forEach(function(category){
                    var localTable = $("<table/>");
                    row.append($("<td/>").append(localTable));

                    var text = "";
                    category.forEach(function(item){localTable.append($("<tr/>").append($("<td/>").text(item.code + ", " + item.n + " Fälle, dad=" + item.dad))) }); //TODO: remove styling from inner tables
                    //row.append($("<td/>").text(text));
                });
            }
        };

        _this.initialize();

        return _this;
    }



    return TopThreeDiagnosisTable;

});
