define(['d3', 'topojson'], function (d3, topojson) {

    function SwissMap(){
        var width = 960, height = 500, selected;
        var path = d3.geo.path().projection(null);
        var svg = d3.select(document.createElementNS(d3.ns.prefix.svg, 'svg'));
        svg.attr("width", width).attr("height", height);
        var _this = $(svg[0]);

        var g = svg.append("g");
        _this.initialize = function () {
            d3.json('topo/ch-cantons.json', function(error, ch) {
                g.selectAll('.cantons')
                    .data(topojson.feature(ch, ch.objects.cantons).features)
                    .enter()
                    .append('path')
                    .attr('class', 'cantons')
                    .attr('d', path)
                    .on("click", _this.toggleZoom)
                    .on('mouseover', function(d){
                    });

                d3.json('topo/ch.json', function(error, ch) {
                    g.append("path")
                        .datum(topojson.mesh(ch, ch.objects.districts, function(a, b) { return a !== b; }))
                        .attr("class", "districts")
                        .attr("d", path);
                });
            });
        };

        _this.toggleZoom = function (d) {
            if (d && selected !== d)
                _this.zoomIn(d);
            else
                _this.zoomOut(d);
        };

        _this.zoomOut = function (d) {
            selected = null;
            _this.zoom(d, width / 2, height / 2, 1);
        };

        _this.zoomIn = function (d) {
            selected = d;
            var centroid = path.centroid(d);
            _this.zoom(d, centroid[0],centroid[1], 2);
        };

        _this.zoom = function (d, x, y, k) {
            g.selectAll("path")
                .classed("active", selected && function(d) { return d === selected; });

            g.transition()
                .duration(750)
                .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")scale(" + k + ")translate(" + -x + "," + -y + ")")
                .style("stroke-width", 1 / k + "px");
        };

        _this.initialize();
        return _this;
    }

    return SwissMap;

});