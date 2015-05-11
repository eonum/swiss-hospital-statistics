define([
    'views/widgets/CodeVisualisationCard',
    'views/ui/CardElement',
    'views/ui/BarChartVisualisation',
    'views/ui/OrdinalCurveChartVisualisation',
    'views/ui/PieChartByAgeVisualisation',
    'views/ui/BoxPlotVisualisation',
    'announcements/OnLabelsCloudAdded',
    'announcements/OnLabelsCloudRemoved'
],function(
    CodeVisualisationCard,
    CardElement,
    BarChartVisualisation,
    OrdinalCurveChartVisualisation,
    PieChartByAgeVisualisation,
    BoxPlotVisualisation,
    OnLabelsCloudAdded,
    OnLabelsCloudRemoved
){

    /**
     * @returns {CodeVisualisationCard}
     * @constructor
     * @class {IcdCodeVisualisationCard}
     * @extends {CodeVisualisationCard}
     */
    function IcdCodeVisualisationCard() {
        var _this = new CodeVisualisationCard();

        var barChartVisualisation,
            ordinalCurveVisualisation,
            pieChartVisualisation,
            boxPlotVisualisation,
            ordinalCurveTabModel;

        /**
         * Initializes all visualisations suitable for icd code
         * @override
         */
        _this.initializeVisualisations = function (tabulatorModel) {
            barChartVisualisation = new BarChartVisualisation(1024, 390);
            ordinalCurveVisualisation = new OrdinalCurveChartVisualisation(1024, 390);
            pieChartVisualisation = new PieChartByAgeVisualisation(1024, 390);
            boxPlotVisualisation = new BoxPlotVisualisation(1024, 390);
            ordinalCurveTabModel = tabulatorModel.addTab("Ordinal curve chart").render(function(){return ordinalCurveVisualisation});
            _this.addButton(tabulatorModel.addTab("Bar chart").render(function(){return barChartVisualisation}).select(), 'chart-bar.png');
            _this.addButton(ordinalCurveTabModel, 'chart-line.png');
            _this.addButton(tabulatorModel.addTab("Pie chart").render(function(){return pieChartVisualisation}), 'chart-pie.png');
            _this.addButton(tabulatorModel.addTab("Box plot").render(function(){return boxPlotVisualisation}).onSelected(function(){boxPlotVisualisation.update()}), 'chart-plot.png');

            _this.model().cloud().announcer().onSendTo(OnLabelsCloudAdded, _this.onComparisonChanged, _this);
            _this.model().cloud().announcer().onSendTo(OnLabelsCloudRemoved, _this.onComparisonChanged, _this);
        };

        _this.onComparisonChanged = function () {
            ordinalCurveTabModel.select();
            _this.updateComparison();
        };

        _this.updateComparison = function () {
            var items = [];
            items.push(_this.model().cloud().items());
            items.push(_this.model().selectedItem());
            var codes = _.map(_.unique(_.flatten(items)), function(item){
                return {type: _this.codeType(), code: item.short_code};
            });
            _this.codeChooser().fetchAllCodeAndDatasets(codes, function(result){
                ordinalCurveVisualisation.visualiseData(result);
            });
        };

        /**
         * Updates visualisations when data is fetched
         * @param code
         * @param datasets
         * @override
         */
        _this.updateVisualisations = function(code, datasets){
            barChartVisualisation.visualiseData(code, datasets);
            _this.updateComparison();
            pieChartVisualisation.visualiseData(code, datasets);
            boxPlotVisualisation.visualiseData(code, datasets);
        };

        /**
         * We visualise ICD code
         * @returns {string}
         * @override
         */
        _this.codeType = function () {
            return 'icd';
        };

        return _this;
    }

    return IcdCodeVisualisationCard;

});