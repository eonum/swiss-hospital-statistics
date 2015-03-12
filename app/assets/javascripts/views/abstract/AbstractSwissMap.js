define(['d3', 'topojson','views/ResponsiveSvg'], function (d3, topojson, ResponsiveSvg) {

    function AbstractSwissMap(_width, _height){
        var _this = new ResponsiveSvg(_width, _height);

        var selected;
        var path = d3.geo.path().projection(null);

        var g = _this.svg().append("g");


        _this._cantonIdSymbol = function () {return 'id'};
        _this._cantonAbbrSymbol = function () {return 'abbr'};
        _this._cantonNameSymbol = function () {return 'name'};

        _this._cantonIdOf = function (canton) {
            return canton.properties[_this._cantonIdSymbol()];
        };

        _this._cantonAbbrOf = function (canton) {
            return canton.properties[_this._cantonAbbrSymbol()];
        };

        _this._cantonNameOf = function (canton) {
            return canton.properties[_this._cantonNameSymbol()];
        };

        _this._cantonDataBindSymbol = function () {
            return _this._cantonIdSymbol();
        };

        _this._quantize = function(d){
            console.log(d);
            return "q" + Math.min(8, ~~(data[d.value] * 9 / 12)) + "-9";
        };

        _this._cantonDataFor = function (data, canton) {
            return _.first(_.select(data.cantons, function (each){
                return each[_this._cantonDataBindSymbol()] === _this._cantonAbbrOf(canton)
            }));
        };


        var data = {
            cantons: [
                { id: 'ZH', value: 20 },
                { id: 'BE', value: 30 }
            ],
            districts: [  ]
        };


        _this._initialize = function (data) {
            d3.json('topo/ch-cantons.json', function(error, ch) {
                _.each(ch.objects.cantons.geometries, function(each){ each.properties[_this._cantonIdSymbol()] = each[_this._cantonIdSymbol()] });
                g.selectAll('.cantons')
                    .data(topojson.feature(ch, ch.objects.cantons).features)
                    .enter()
                    .append('path')
                    .attr('class', 'cantons')
                    .attr('d', path)
                    .attr('class', function(each){
                        var d = _this._cantonDataFor(data,each);
                        var clazz = d3.select(this).attr("class");
                        if (_.isUndefined(d)) return clazz;
                        console.log(_this._quantize);
                        return clazz + " " + _this._quantize(d);
                    })
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
            _this.zoom(d, _this._width() / 2, _this._height() / 2, 1);
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
                .attr("transform", "translate(" + _this._width() / 2 + "," + _this._height() / 2 + ")scale(" + k + ")translate(" + -x + "," + -y + ")")
                .style("stroke-width", 1 / k + "px");
        };

        _this._initialize(data);
        return _this;
    }

    return AbstractSwissMap;

});