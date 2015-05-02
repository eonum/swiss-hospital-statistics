define([
    'views/widgets/CodeVisualisationCard',
    'views/ui/CardElement',
    'views/ui/BarChartVisualisation',
    'views/ui/OrdinalCurveChartVisualisation',
    'views/ui/PieChartByAgeVisualisation',
    'views/ui/BoxPlotVisualisation'
],function(
    CodeVisualisationCard,
    CardElement,
    BarChartVisualisation,
    OrdinalCurveChartVisualisation,
    PieChartByAgeVisualisation,
    BoxPlotVisualisation
){

    /**
     * @returns {CodeVisualisationCard}
     * @constructor
     * @class {DrgCodeVisualisationCard}
     * @extends {CodeVisualisationCard}
     */
    function DrgCodeVisualisationCard() {
        var _this = new CodeVisualisationCard();

        var barChartVisualisation,
            barChartCard,
            ordinalCurveVisualisation,
            ordinalCurveChartCard,
            pieChartVisualisation,
            pieChartCard,
            boxPlotVisualisation,
            boxPlotCard;

        /**
         * Initializes all visualisations suitable for drg code
         * @override
         */
        _this.initializeVisualisations = function () {
            // create bar chart
            barChartVisualisation = new BarChartVisualisation(800, 400);
            barChartCard = new CardElement("barChart",barChartVisualisation);
            _this.addCard(barChartCard);
            _this.addButton("barChart", "Bar Chart");

            // create ordinal curve chart
            ordinalCurveVisualisation = new OrdinalCurveChartVisualisation(800, 400);
            ordinalCurveChartCard = new CardElement("ordinalCurve",ordinalCurveVisualisation);
            _this.addCard(ordinalCurveChartCard);
            _this.addButton("ordinalCurve", "Ordinal Curve");

            // create pie chart
            pieChartVisualisation = new PieChartByAgeVisualisation(800, 400);
            pieChartCard = new CardElement("pieChart", pieChartVisualisation);
            _this.addCard(pieChartCard);
            _this.addButton("pieChart","Pie Chart");

            // create box plot
            boxPlotVisualisation = new BoxPlotVisualisation(800, 400);
            boxPlotCard = new CardElement("boxPlot", boxPlotVisualisation);
            _this.addCard(boxPlotCard);
            _this.addButton("boxPlot","BoxPlot");
        };

        /**
         * Updates visualisations when data is fetched
         * @param code
         * @param datasets
         * @override
         */
        _this.updateVisualisations = function(code, datasets){
            var title = code.code + ": " + code.text_de;

            barChartVisualisation.visualiseData(title, datasets);
            ordinalCurveVisualisation.visualiseData(title, datasets);
            pieChartVisualisation.visualiseData(title, datasets);
            boxPlotVisualisation.visualiseData(title, datasets);
        };

        /**
         * We visualise DRG code
         * @returns {string}
         * @override
         */
        _this.codeType = function () {
            return 'drg';
        };

        return _this;
    }

    return DrgCodeVisualisationCard;

});