define(['d3', 'topojson','views/ResponsiveSvg'], function (d3, topojson, ResponsiveSvg) {

    function AbstractSwissMap(_width, _height){
        var _this = new ResponsiveSvg(_width, _height);

        var selected;
        var path = d3.geo.path().projection(null);

        var g = _this.svg().append("g");
        var cantonQuantize;

        _this._cantonsEnabled = function () { return true };
        _this._cantonIdSymbol = function () { return 'id' };
        _this._cantonAbbrSymbol = function () { return 'abbr' };
        _this._cantonNameSymbol = function () { return 'name' };
        _this._cantonsSymbol = function () { return 'cantons' };
        _this._cantonBindSymbol = function () { return _this._cantonAbbrSymbol() };
        _this._cantonQuantizeAmount = function () { return 9 };

        _this._cantonDataBindSymbol = function () { return _this._cantonIdSymbol() };
        _this._cantonDataValueSymbol = function() { return 'value' };

        _this._districtsEnabled = function () { return false };

        _this._cantonIdOf = function (canton) {
            return canton.properties[_this._cantonIdSymbol()];
        };

        _this._cantonAbbrOf = function (canton) {
            return canton.properties[_this._cantonAbbrSymbol()];
        };

        _this._cantonNameOf = function (canton) {
            return canton.properties[_this._cantonNameSymbol()];
        };

        _this._cantonBindValueOf = function (canton) {
            return canton.properties[_this._cantonBindSymbol()];
        };

        _this._cantonsOf = function (data) {
            return data[_this._cantonsSymbol()];
        };

        _this._cantonDataBindValueOf = function (data) {
            return data[_this._cantonDataBindSymbol()];
        };

        _this._cantonDataValueOf = function (canton) {
            return canton[_this._cantonDataValueSymbol()]
        };

        _this._cantonQuantize = function(canton){
            return "q" + cantonQuantize(_this._cantonDataValueOf(canton)) + "-9";
        };

        _this._cantonDataFor = function (data, canton) {
            return _.first(_.select(_this._cantonsOf(data), function (each){
                return _this._cantonDataBindValueOf(each) === _this._cantonBindValueOf(canton)
            }));
        };

        var data = {
            cantons: [
                { id: 'ZH', value: 35.81 },
                { id: 'BE', value: 32.92 },
                { id: 'LU', value: 34.31 },
                { id: 'UR', value: 27.36 },
                { id: 'SZ', value: 34.51 },
                { id: 'OW', value: 25.77 },
                { id: 'NW', value: 31.10 },
                { id: 'GL', value: 38.83 },
                { id: 'ZG', value: 40.95 },
                { id: 'FR', value: 30.97 },
                { id: 'SO', value: 35.25 },
                { id: 'BS', value: 33.59 },
                { id: 'BL', value: 37.22 },
                { id: 'SH', value: 37.71 },
                { id: 'AR', value: 29.67 },
                { id: 'AI', value: 28.82 },
                { id: 'SG', value: 33.97 },
                { id: 'GR', value: 32.56 },
                { id: 'AG', value: 34.19 },
                { id: 'TG', value: 30.91 },
                { id: 'TI', value: 33.85 },
                { id: 'VD', value: 32.24 },
                { id: 'VS', value: 27.01 },
                { id: 'NE', value: 27.50 },
                { id: 'GE', value: 31.90 },
                { id: 'JU', value: 18.85 },
                { id: 'ZY', value: 32.42 },
                { id: 'ZX', value: 50.00 }
            ],
            districts: [  ]
        };

        _this._initialize = function (data) {
            cantonQuantize = d3.scale.quantize()
                .domain([d3.min(_this._cantonsOf(data), function(canton) {
                    return _this._cantonDataValueOf(canton);
                }), d3.max(_this._cantonsOf(data), function(canton) {
                    return _this._cantonDataValueOf(canton);
                })])
                .range(_.range(_this._cantonQuantizeAmount()));

            _this.loadCantons(data);
        };

        _this.loadCantons = function (data) {
            if (!_this._cantonsEnabled()) return;

            d3.json('topo/ch-cantons.json', function(error, ch) {
                _.each(ch.objects.cantons.geometries, function(each){ each.properties[_this._cantonIdSymbol()] = each[_this._cantonIdSymbol()] });
                g.selectAll('.cantons')
                    .data(topojson.feature(ch, ch.objects.cantons).features)
                    .enter()
                    .append('path')
                    .attr('class', 'cantons')
                    .attr('d', path)
                    .attr('class', function(each){
                        var canton = _this._cantonDataFor(data,each);
                        var clazz = d3.select(this).attr("class");
                        if (_.isUndefined(canton)) return clazz;
                        return clazz + " " + _this._cantonQuantize(canton);
                    })
                    .on("click", _this.toggleZoom)
                    .on('mouseover', function(d){
                    });

                _this.loadDistricts(data);
            });
        };

        _this.loadDistricts = function (data) {
            if (!_this._districtsEnabled()) return;
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