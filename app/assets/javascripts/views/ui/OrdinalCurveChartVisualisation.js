define([
    'helpers/CodeChooser',
    'views/OrdinalCurveChart',
    'views/ui/ChartVisualisation',
    'helpers/converters/NumberByAgeDatasetConverter',
    'helpers/converters/DatasetSorter',
    'announcements/OnLabelsCloudAdded',
    'announcements/OnLabelsCloudRemoved'
], function(
    CodeChooser,
    OrdinalCurveChart,
    ChartVisualisation,
    NumberByAgeDatasetConverter,
    DatasetSorter,
    OnLabelsCloudAdded,
    OnLabelsCloudRemoved
) {
    function OrdinalCurveChartVisualisation(){
        var _this = new ChartVisualisation();

        var codeChooser;

        _this.codeChooser = function () {
            if (_.isUndefined(codeChooser))
                codeChooser = _this.newCodeChooser();
            return codeChooser;
        };

        _this.newCodeChooser = function () {
            return new CodeChooser(_this.codeType(), function(){});
        };

        _this.model = override(_this, _this.model, function(_model){
            if (_.isUndefined(_model)) return this.super();
            this.super(_model);
            _this.model().cloud().announcer().onSendTo(OnLabelsCloudAdded, _this.onCompared, _this);
            _this.model().cloud().announcer().onSendTo(OnLabelsCloudRemoved, _this.onCompared, _this);
        });

        _this.onCompared = function () {
            _this.tab().select();
            _this.update();
        };

        /**
         * @override
         */
        _this.newChart = function () {
            return new OrdinalCurveChart(_this.defaultWidth(), _this.defaultHeight());
        };

        /**
         * @override
         */
        _this.initializeChart = function(chart){
            chart
                .chartName(function(){
                    return Multiglot.translations.charts.ordinal.name
                })
                .title(function(entity) { return {
                    de: entity.codes[0].code[0].code + ': ' + entity.codes[0].code[0].text_de,
                    fr: entity.codes[0].code[0].code + ': ' + entity.codes[0].code[0].text_fr,
                    it: entity.codes[0].code[0].code + ': ' + entity.codes[0].code[0].text_it
                }})
                .yAxisLabel(function(){
                    return Multiglot.translations.charts.ordinal.axises.y
                })
                .xAxisLabel(function(){
                    return Multiglot.translations.charts.ordinal.axises.x
                })
                .legend(function(entity) {
                    return _.map(entity.codes, function(each){
                        return each.code[0];
                    });
                })
                .legendLabel(function(item){
                    return {
                        de: item.code + ': ' + item.text_de,
                        fr: item.code + ': ' + item.text_fr,
                        it: item.code + ': ' + item.text_it
                    }
                })
                .nothing(override(chart, chart.settings().nothing, function(raw, entity){
                    return this.super(raw, entity) || _.every(entity, function(each){ return _.isEmpty(each) });
                }))
                .display(function(entity) { return entity.data })
                .x('interval')
                .y('amount');
        };

        /**
         * @override
         */
        _this.update = function () {
            var items = [];
            items.push(_this.model().cloud().items());
            items.push(_this.model().selectedItem());
            var codes = _.map(_.unique(_.flatten(items)), function(item){
                return {type: _this.codeType(), code: item.short_code};
            });
            _this.codeChooser().fetchAllCodeAndDatasets(codes, function(result){
                _this.visualise(result);
            });
        };

        /**
         * Updates this visualisation based upon the given description and datasets.
         * @param codes
         */
        _this.visualise = function (codes){
            var data = _.map(codes, function(code) {
                var sorter = new DatasetSorter(code.datasets);
                var sortedDatasets = sorter.sortByIntervalsAscending();
                var converter = new NumberByAgeDatasetConverter(sortedDatasets);
                return converter.asAbsoluteData();
            });
            var intervals = _.unique(_.pluck(_.flatten(data), 'interval')).sort();
            data = _.map(data, function(curve){
                return _.sortBy(_.union(curve,_.map(_.reject(intervals, function(interval) {
                    return _.contains(_.pluck(curve, 'interval'), interval) }), function(interval){
                        return {interval: interval, amount: 0}
                })), function(d){return d.interval});
            });

            _this.chart().on({codes: codes, data: data});
        };

        return _this;
    }

    return OrdinalCurveChartVisualisation;
});