define([
    'views/abstract/AbstractSwissMap',
    'views/PieChart',
    'views/SeriesChart',
    'views/CardBoardView',
    'views/CardView',
    'views/abstract/AbstractSeriesChart',
    'models/Catalog',
    'views/ui/CodeTableView',
    'views/ui/CodeButtonBarView',
    'models/categories/SexCategory',
    'helpers/CategoryAdapter',
    'helpers/CodeAdapter'
], function(AbstractSwissMap,PieChart,SeriesChart, CardBoardView, CardView, AbstractSeriesChart, Catalog, CodeTableView, CodeButtonBarView){

    "use strict";
    function App() {
        var _this = this;


        var pieChart = new PieChart(250, 250);

        console.log("Starting");
        $.getJSON( "/api/v1/codes/icd/info/C341", function( data ) {
            var zeroToFourteen = 0;
            var fifteenToThirtynine = 0;
            var fortyToSixtynine = 0;
            var overSeventy = 0;
            console.log(JSON.stringify(data));
            console.log(data.codes.icd.codes[0].description);
            console.log(data.codes.icd.codes[0].categorised_data.categories.interval[0].n);
            var description = data.codes.icd.codes[0].description;
            var numberOfIntervals = data.codes.icd.codes.length;
            for(var i = 0; i < numberOfIntervals; i++) {
                var interval = data.codes.icd.codes[i].categorised_data.categories.interval[0].interval.from;
                switch(interval) {
                    case 0:
                        zeroToFourteen = data.codes.icd.codes[i].categorised_data.categories.interval[0].n;
                        break;
                    case 15:
                        fifteenToThirtynine = data.codes.icd.codes[i].categorised_data.categories.interval[0].n;
                        break;
                    case 40:
                        fortyToSixtynine = data.codes.icd.codes[i].categorised_data.categories.interval[0].n;
                        break;
                    case 70:
                        overSeventy = data.codes.icd.codes[i].categorised_data.categories.interval[0].n
                        break;
                    default:
                        console.log("nothing to update");
                }
            }
            console.log("zeroToFourteen: " + zeroToFourteen);
            console.log("fifteenToThirtynine: " + fifteenToThirtynine);
            console.log("fortyToSixtynine: " + fortyToSixtynine);
            console.log("overSeventy: " + overSeventy);

            pieChart.openOn([
                { key: 'fifteenToThirtynine', value: fifteenToThirtynine },
                { key: 'fortyToSixtynine', value: fortyToSixtynine },
                { key: 'overSeventy', value: overSeventy }]);
        });

        console.log("Ending");

        $('body').append(pieChart);

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




        //_this.cardView();
        //_this.codes();
    }

    return App
});