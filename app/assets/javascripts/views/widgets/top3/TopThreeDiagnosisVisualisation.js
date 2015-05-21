define([
    'View',
    'views/widgets/top3/TopThreeDiagnosisTable'
],function (
    View,
    TopThreeDiagnosisTable
){

        function TopThreeDiagnosisVisualisation(_width, _height){
            const TOTAL = 0;
            const MEN = 1;
            const WOMEN = 2;

            var _this = new View('<div></div>');
            var topThreeTable = new TopThreeDiagnosisTable(_width, _height);
            var datasets;

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

               // first filter by year
               var filtered = _.filter(datasets, function(dataset){
                   return dataset.year === year;
               });

               // filter by hospital type
               filtered = _.filter(filtered, function(dataset){
                   return dataset.hospital.text_de == hospitalType;
               });

               // group by age interval
               var result = _.groupBy(filtered, function(dataset){
                   return dataset.interval.from;
               });

               // get the age intervals as array of arrays
               result = _.values(result);

               // group by sex
               result = _.map(result, function(ageIntervalDatasets){
                   return _.groupBy(ageIntervalDatasets, function(singleDataset){
                       return singleDataset.sex;
                   })
               });

               topThreeTable.setData(result, year, hospitalType);
            };

            _this.getSexInterval = function(dataset){
                return dataset.categorised_data.categories['sex_interval'][0];
            };

            _this.initialize();

            return _this;
        }

        return TopThreeDiagnosisVisualisation;
    });
