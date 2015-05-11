define([
    'View',
    'views/widgets/top3/TopThreeDiagnosisTable'
],function (
    View,
    TopThreeDiagnosisTable
){

        function TopThreeDiagnosisVisualisation(_width, _height){
            var _this = new View('<div></div>');
            var topThreeTable = new TopThreeDiagnosisTable(_width, _height);

            _this.initialize = function (){
                _this.append(topThreeTable);

                _this.fillChartWithDummyObjects();
            };


            _this.fillChartWithDummyObjects = function(){
                var total = [{"code":"Z380  Einling, Geburt im Krankenhaus", "n":"37.3", "dad":"4.6"}, {"code":"Z380  Einling, Geburt im Krankenhaus", "n":"37.3", "dad":"4.6"}, {"code":"Z380  Einling, Geburt im Krankenhaus", "n":"37.3", "dad":"4.6"}];
                var male = [{"code":"Z380  Einling, Geburt im Krankenhaus", "n":"37.3", "dad":"4.6"}, {"code":"Z380  Einling, Geburt im Krankenhaus", "n":"37.3", "dad":"4.6"}, {"code":"Z380  Einling, Geburt im Krankenhaus", "n":"37.3", "dad":"4.6"}];
                var female = [{"code":"Z380  Einling, Geburt im Krankenhaus", "n":"37.3", "dad":"4.6"}, {"code":"Z380  Einling, Geburt im Krankenhaus", "n":"37.3", "dad":"4.6"}, {"code":"Z380  Einling, Geburt im Krankenhaus", "n":"37.3", "dad":"4.6"}];

                var dataset =  [total, male, female];
                var datasets = [dataset, dataset, dataset,dataset,dataset];

                var hardcodedYear = 2013;
                var hardcodedHospitalTypeString = "Spezialkliniken: Reha";

                topThreeTable.setData(datasets, hardcodedYear, hardcodedHospitalTypeString);

            };


            _this.add = override(_this, _this.add, function(element){
                _this.add(element);
                return _this;
            });

            /**
             * Creates the visualisation by displaying the given dataset
             * @param dataset
             */
            _this.visualiseData = function (description, datasets){

                //TODO: implement this
            };

            /*_this.getFirstProperty = function (object){
                return _.first(_.values(object));
            };*/

            _this.initialize();

            return _this;
        }

        return TopThreeDiagnosisVisualisation;
    });
