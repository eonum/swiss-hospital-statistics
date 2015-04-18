
define([
    'views/ui/CardElement',
    'views/ui/CardPane',
    'views/abstract/AbstractSwissMap',
    'views/PieChart',
    'views/SeriesChart',
    'views/CardBoardView',
    'views/CardView',
    'views/abstract/AbstractSeriesChart',
    'models/Catalog',
    'views/ui/CodeTableView',
    'views/ui/CodeButtonBarView',
    'views/ui/ChartChoiceButtonBar',
    'views/ui/PieChartByAgeVisualisation',
    'views/ui/BarChartVisualisation',
    'views/ui/BoxPlotVisualisation',
    'views/BarChart',
    'views/BoxPlot',
    'views/OrdinalCurveChart',
    'views/ui/OrdinalCurveChartVisualisation',
    'helpers/CodeChooser',
    'views/ui/CatalogChoiceButtonBar'
], function(CardElement, CardPane, AbstractSwissMap, PieChart, SeriesChart, CardBoardView, CardView, AbstractSeriesChart,
            Catalog, CodeTableView, CodeButtonBarView, ChartChoiceButtonBar, PieChartByAgeVisualisation,BarChartVisualisation,
            BoxPlotVisualisation, BarChart, BoxPlot, OrdinalCurveChart, OrdinalCurveChartVisualisation, CodeChooser, CatalogChoiceButtonBar){

    "use strict";
    function App() {
        var _this = this;

        var catalogChoiceButtons = new CatalogChoiceButtonBar();
        var table = new CodeTableView();
        var buttons = new CodeButtonBarView();
        var chartCardPane = new CardPane();
        var chartChoiceButtons = new ChartChoiceButtonBar(chartCardPane);

        var catalog = new Catalog();
        catalog.loadTypes(function(){
            buttons.setTypes(catalog.types());
            var type;
            buttons.find('a').click(function(){
                type = $(this).me().model();
                catalog.loadCodeType(type, function(){
                    table.setCodes(_.values(catalog.codes(type)));
                });
            });
        });


        _this.initialize = function(){
            _this.addCatalogChoiceButtons();
            $('body').append(chartChoiceButtons);
            _this.visualise();
            _this.icdBoxPlot();
            $('body').append(chartCardPane);
        }


        _this.addCatalogChoiceButtons = function(){
            catalogChoiceButtons.addButton("ICD", function(){window.alert("Hi! I'm the ICD catalog!")});
            catalogChoiceButtons.addButton("CHOP", function(){window.alert("Hi! I'm the CHOP catalog!")});
            catalogChoiceButtons.addButton("DRG", function(){window.alert("Hi! I'm the DRG catalog!")});
            $('body').append(catalogChoiceButtons);
        };

        
        _this.visualise = function () {
            var barChartVisualisation = new BarChartVisualisation(800, 400);
            var barChartCard = new CardElement("barChart",barChartVisualisation);
            chartCardPane.addCard(barChartCard);
            chartChoiceButtons.addButton("barChart", "Bar Chart");

            var ordinalCurveVisualisation = new OrdinalCurveChartVisualisation(800, 400);
            var ordinalCurveChartCard = new CardElement("ordinalCurve",ordinalCurveVisualisation);
            chartCardPane.addCard(ordinalCurveChartCard);
            chartChoiceButtons.addButton("ordinalCurve", "Ordinal Curve");

            var pieChartVisualisation = new PieChartByAgeVisualisation();
            var pieChartCard = new CardElement("pieChart", pieChartVisualisation);
            chartCardPane.addCard(pieChartCard);
            chartChoiceButtons.addButton("pieChart","Pie Chart");

            var boxPlotVisualisation = new BoxPlotVisualisation(700, 500);
            var boxPlotCard = new CardElement("boxPlot", boxPlotVisualisation);
            chartCardPane.addCard(boxPlotCard);
            chartChoiceButtons.addButton("boxPlot","BoxPlot");

            function updateVisualisations(code, datasets){
                var title = code.code + ": " + code.text_de;

                barChartVisualisation.visualiseData(title, datasets);
                ordinalCurveVisualisation.visualiseData(title, datasets);
                pieChartVisualisation.visualiseData(title, datasets);
                boxPlotVisualisation.visualiseData(title, datasets);
            }

            var codeChooser = new CodeChooser("icd", updateVisualisations);
            codeChooser.appendTo($('body'));

            codeChooser.fetchDatasets("icd", "A045", updateVisualisations);
        };

        _this.icdBoxPlot = function () {
            $.getJSON("/api/v1/codes/icd/datasets/A045", function(data) {
                var card = new CardElement("boxPlot", null);
                chartChoiceButtons.addButton("boxPlot", "Box Plot");

                card.append('<p class="code_title">ICD-Code auswählen:</p>');
                card.append('<input class="code_title", id="code_chooser2"/>');
                var visualisation = new BoxPlotVisualisation(700, 500);
                card.append(visualisation.visualise(data));

                $('#code_chooser2').keyup(function () {
                    var text = $('#code_chooser2').val();
                    if(text.length >= 4){
                        $.getJSON( "/api/v1/codes/icd/datasets/" + text, function( data ) {
                            visualisation.visualise(data);
                            $("#code_chooser2").focus();
                        });
                    }
                });

                chartCardPane.addCard(card);
            })
        };

        _this.codes = function () {
            console.log('------------ C H O P ---------------');
            console.log('Received from server:');
            var chop = '{"codes":{"chop":{"description":"Chop code is type of code that bla bla bla","codes":[{"code":"001200","description":"Inhalation von Stickstoffmonoxyd, Dauer der Behandlung bis unter 48 Stunden","years":[{"categories":[{"interval":[{"categories":[{"percentile":[{"amount":14,"percentile":5.0},{"amount":14.0,"percentile":10.0},{"amount":14.0,"percentile":25.0},{"amount":14.0,"percentile":50.0},{"amount":14.0,"percentile":75.0},{"amount":14.0,"percentile":90.0},{"amount":14.0,"percentile":95.0}]}],"n":1,"dad":14.0,"interval":{"from":0,"to":14},"max":14,"min":14,"sa":0.0}]}],"year":2013}]}]}}}';
            console.log(chop);
            var chopCodes = ServiceProvider.jsonParser.parse(chop);
            console.log('Serialized in Code Models:');
            _.each(chopCodes, function(each) {
                console.log(each.toString())});

            console.log('------------ D R G ---------------');
            console.log('Received from server:');
            var drg = '{"codes":{"drg":{"codes":[{"code":"901A","description":"Ausgedehnte OR-Prozedur ohne Bezug zur Hauptdiagnose mit komplizierenden Prozeduren oder Strahlentherapie","years":[{"categories":[{"interval":[{"categories":[{"percentile":[{"amount":5,"percentile":5},{"amount":5.4,"percentile":10},{"amount":12,"percentile":25},{"amount":24,"percentile":50},{"amount":"35.5.0","percentile":75},{"amount":"44.8.0","percentile":90},{"amount":48.6,"percentile":95}]}],"dad":26,"interval":{"from":70},"max":85,"min":1,"n":23,"sa":19}]}],"year":"2013"}]}],"description":"Drg code is type of code that bla bla bla"}}}';
            console.log(drg);
            console.log('Serialized in Code Models:');
            var drgCodes = ServiceProvider.jsonParser.parse(drg);
            _.each(drgCodes, function(each) {
                console.log(each.toString())});

            console.log('------------ I C D ---------------');
            console.log('Received from server:');
            var icd = '{"codes":{"icd":{"code":"A010","description":"Typhus abdominalis","years":[{"categories":[{"interval":[{"categories":[{"percentile":[{"amount":2,"percentile":5},{"amount":2,"percentile":10},{"amount":6,"percentile":25},{"amount":6.5,"percentile":50},{"amount":7,"percentile":75},{"amount":9,"percentile":90},{"amount":9,"percentile":95}]}],"n":6,"dad":6.2,"interval":{"from":0,"to":14},"max":9,"min":2,"sa":2.32}]}],"year":"2013"}]}}}';
            console.log(icd);
            console.log('Serialized in Code Models:');
            var icdCodes = ServiceProvider.jsonParser.parse(icd);
            _.each(icdCodes, function(each){
                console.log(each.toString())});

            console.log('------------ A G E ---------------');
            console.log('Received from server:');
            var age = '{"codes":{"age":{"code":"010","description":"Brucellose","years":[{"categories":[{"sex":[{"categories":[{"valueInterval":[{"interval":{"from":20,"to":24},"n":1},{"interval":{"from":30,"to":34},"n":1},{"interval":{"from":35,"to":39},"n":1}]}],"sex":"f"},{"categories":[{"valueInterval":[{"interval":{"from":25,"to":29},"n":2},{"interval":{"from":80,"to":84},"n":1}]}],"sex":"m"}]}],"year":"2013"}]}}}';
            console.log(age);
            console.log('Serialized in Code Models:');
            var ageCodes = ServiceProvider.jsonParser.parse(age);
            _.each(ageCodes, function(each){
                console.log(each.toString())});

            console.log('------- K E   R E G I O N ---------');
            console.log('Received from server:');
            var kdeRegion = '{"codes":{"ke":{"code":"ZH01","description":"Anzahl Kaiserschnitte an Entbindungen","years":[{"categories":[{"ke_b":[{"categories":[{"ke_region":[{"code":"ZH01","name":"Zürich-City","births":186,"cesareans":70,"cesareansPercent":37.6,"age":33.3,"cesareanAge":35.1}]}]}]}],"year":2013}]}}}';
            console.log(kdeRegion);
            console.log('Serialized in Code Models:');
            var keRegionCodes = ServiceProvider.jsonParser.parse(kdeRegion);
            _.each(keRegionCodes, function(each){
                console.log(each.toString())});


            console.log('------- K E   K A N T O N ---------');
            console.log('Received from server:');
            var keKanton = '{"codes":{"ke":{"code":"ZH","description":"Anzahl Kaiserschnitte an Entbindungen","years":[{"categories":[{"ke_a":[{"categories":[{"ke_kanton":[{"code":"ZH","cesareansPercent":35.49,"age":33.3,"cesareanAge":33.0}]}]}]}],"year":2013}]}}}';
            console.log(keKanton);
            console.log('Serialized in Code Models:');
            var keKantonCodes = ServiceProvider.jsonParser.parse(keKanton);
            _.each(keKantonCodes, function(each){
                console.log(each.toString())});
        };

        _this.visualise();
        //_this.icdBoxPlot();


        _this.initialize();
    }

    return App
});
