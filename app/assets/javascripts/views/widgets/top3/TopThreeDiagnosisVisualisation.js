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
            var topThreeTable;
            var converter = new Top3ByYearConverter();

            var datasets;

            _this.add = override(_this, _this.add, function(element){
                _this.add(element);
                return _this;
            });

            _this.setData = function (data){
                // make the sex interval better accessible
                datasets = _.map(data, function(dataset){
                    return _.extend(dataset, _this.getSexInterval(dataset))
                });
            };

           _this.visualiseSelection = function(year, hospitalType){
               if(_.isUndefined(year) || _.isUndefined(hospitalType) || _.isUndefined(datasets)){
                   return;
               }

               if(_.isUndefined(topThreeTable)){
                   topThreeTable = new TopThreeDiagnosisTable(_width, _height);
                   _this.append(topThreeTable);
               }

               var result = converter.convert(datasets, year,  hospitalType);

               topThreeTable.setData(result);
            };

            _this.getSexInterval = function(dataset){
                return dataset.categorised_data.categories['sex_interval'][0];
            };

            return _this;
        }

        return TopThreeDiagnosisVisualisation;
    });
