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
            };

            //TODO: what do you do...?
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
