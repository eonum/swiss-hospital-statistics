define([
    'views/widgets/CodeVisualisationCard',
    'views/ui/CardElement',
    'views/ui/BarChartVisualisation',
    'views/ui/OrdinalCurveChartVisualisation',
    'views/ui/PieChartByAgeVisualisation',
    'views/ui/BoxPlotVisualisation',
    'views/ui/ChaptersByYearVisualisation'
],function(
    CodeVisualisationCard,
    CardElement,
    BarChartVisualisation,
    OrdinalCurveChartVisualisation,
    PieChartByAgeVisualisation,
    BoxPlotVisualisation,
    ChaptersByYearVisualisation
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
            chaptersByYearVisualisation;

        /**
         * Initializes all visualisations suitable for icd code
         * @override
         */
        _this.initializeVisualisations = function (tabulatorModel) {
            barChartVisualisation = new BarChartVisualisation(800, 390);
            ordinalCurveVisualisation = new OrdinalCurveChartVisualisation(800, 390);
            pieChartVisualisation = new PieChartByAgeVisualisation(800, 390);
            boxPlotVisualisation = new BoxPlotVisualisation(800, 390);
            chaptersByYearVisualisation = new ChaptersByYearVisualisation(800, 390);
            _this.addButton(tabulatorModel.addTab("Bar chart").render(function(){return barChartVisualisation}).select(), 'chart-bar.png');
            _this.addButton(tabulatorModel.addTab("Ordinal curve chart").render(function(){return ordinalCurveVisualisation}), 'chart-line.png');
            _this.addButton(tabulatorModel.addTab("Pie chart").render(function(){return pieChartVisualisation}), 'chart-pie.png');
            var boxTab = tabulatorModel.addTab("Box plot").render(function(){return boxPlotVisualisation});
            var chapterTab = tabulatorModel.addTab("Chapters by year").render(function(){return chaptersByYearVisualisation});
        };

        /**
         * Updates visualisations when data is fetched
         * @param code
         * @param datasets
         * @override
         */
        _this.updateVisualisations = function(code, datasets){
            var title = code.code + ": " + code.text_de;

            barChartVisualisation.visualiseData(code, datasets);
            ordinalCurveVisualisation.visualiseData(title, datasets);
            pieChartVisualisation.visualiseData(title, datasets);
            boxPlotVisualisation.visualiseData(title, datasets);
            //chaptersByYearVisualisation.visualiseData(title, datasets);
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