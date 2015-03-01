define(['d3', 'topojson'], function (d3, topojson) {

    function SwissMap(){
        var width = 960, height = 500;
        var path = d3.geo.path().projection(null);
        var svg = d3.select(document.createElementNS(d3.ns.prefix.svg, 'svg'));
        svg.attr("width", width).attr("height", height);
        var _this = $(svg[0]);

        _this.initialize = function () {
            d3.json('topo/ch.json', function(error, ch) {
                svg.append("path")
                    .datum(topojson.feature(ch, ch.objects.country))
                    .attr("class", "country")
                    .attr("d", path);

                svg.append("path")
                    .datum(topojson.feature(ch, ch.objects.lakes))
                    .attr("class", "lake")
                    .attr("d", path);

                svg.append("path")
                    .datum(topojson.mesh(ch, ch.objects.municipalities, function(a, b) { return a !== b; }))
                    .attr("class", "municipality-boundaries")
                    .attr("d", path);

                svg.selectAll('.cantons')
                    .data(topojson.feature(ch, ch.objects.cantons).features)
                    .enter()
                    .append('path')
                    .attr('class', 'cantons')
                    .attr('d', path)
                    .on('mouseover', function(d){
                        console.log(d);
                    });
            });
        };

        _this.initialize();
        return _this;
    }

    return SwissMap;

});