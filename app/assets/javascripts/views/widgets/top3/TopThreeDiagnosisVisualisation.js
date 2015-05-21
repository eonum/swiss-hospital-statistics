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
            var converter = new Top3ByYearConverter();

            var datasets;

            _this.initialize = function (){
                _this.append(topThreeTable);
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
