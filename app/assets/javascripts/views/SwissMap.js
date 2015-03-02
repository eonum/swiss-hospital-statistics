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

                d3.json('topo/ch-districts.json', function(error, chDistricts) {
                    g.selectAll('.districts')
                        .data(topojson.feature(chDistricts, chDistricts.objects.districts).features)
                        .enter()
                        .append('path')
                        .attr("class", "districts")
                        .on("click", function (district){
                            _this.toggleZoom((_this.cantonOf(district)[0]).__data__)
                        })
                        .attr("d", path)
                });
            });
        };

        _this.districtsOf = function (canton) {
            var cID = canton.id.toString();
            return g.selectAll('.districts')
                .filter(function(district) {
                    var dID = district.id.toString();
                    if (dID.length !== cID.length + 2) return false;
                    return dID.lastIndexOf(cID, 0) === 0;});
        };

        _this.cantonOf = function (district) {
            var dID = district.id.toString();
            return (g.selectAll('.cantons')
                .filter(function(canton) {
                    var cID = canton.id.toString();
                    if (dID.length !== cID.length + 2) return false;
                    return dID.lastIndexOf(cID, 0) === 0;}))[0];
        };

        _this.enableDistricts = function (districts) {
            districts.classed('active',true);
        };

        _this.disableAllDistricts = function () {
            g.selectAll('.districts').classed('active', false);
        };


        _this.toggleZoom = function (d) {
            _this.disableAllDistricts();
            _this.enableDistricts(_this.districtsOf(d));
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
            g.selectAll(".cantons")
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