define([
    'View',
    'views/widgets/top3/TopThreeDiagnosisTable',
        'helpers/converters/Top3ByYearConverter'
],function (
    View,
    TopThreeDiagnosisTable,
    Top3ByYearConverter
){

        function TopThreeDiagnosisVisualisation(_width, _height){
            const TOTAL = 0;
            const MEN = 1;
            const WOMEN = 2;

            var _this = new View('<div></div>');
            var topThreeTable = new TopThreeDiagnosisTable(_width, _height);
            var datasets;
            var converter = new Top3ByYearConverter();

            _this.initialize = function (){
                _this.append(topThreeTable);
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

            _this.setData = function (data){
                // get rid of properties we don't want
                datasets = _.map(data, function(dataset){
                    return _.extend(dataset, _this.getSexInterval(dataset))
                });
            };

           _this.visualiseSelection = function(year, hospitalType){
               if(_.isUndefined(year) || _.isUndefined(hospitalType)){
                   return;
               }

               var result = converter.convert(datasets, year,  hospitalType);

               topThreeTable.setData(result);
            };

            _this.getSexInterval = function(dataset){
                return dataset.categorised_data.categories['sex_interval'][0];
            };

            _this.initialize();

            return _this;
        }

        return TopThreeDiagnosisVisualisation;
    });
