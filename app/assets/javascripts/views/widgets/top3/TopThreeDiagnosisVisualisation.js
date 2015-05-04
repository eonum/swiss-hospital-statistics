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

                _this.fillChartWithDummyObjects(true);
            };


            _this.fillChartWithDummyObjects = function(simle){
                var datasets = [];

                if(simle){
                    datasets = [{"name": "Box 0/0", "value": 10}, {"name": "Box 0/1", "value": 4}, {"name": "Box 0/2", "value": 12}];
                }
                else{
                    datasets = [{"name": "Box 0/0", "value": 10}, {"name": "Box 0/1", "value": 4}, {"name": "Box 0/2", "value": 12},
                        {"name": "Box 1/0", "value": 10}, {"name": "Box 1/1", "value": 10}, {"name": "Box 1/2", "value": 10},
                        {"name": "Box 2/0", "value": 10}, {"name": "Box 2/1", "value": 10}, {"name": "Box 2/2", "value": 10}];
                }

                topThreeTable.setData(datasets);

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
