define(['views/TopThreeDiagnosisTable', 'View'],
    function (TopThreeDiagnosisTable, View){

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
                var data = [{"interval": "0-14", "codeTotal": "Z380", "amountTotal": 37.3, "codeMale": "Z380", "amountMale": 35.1, "codeFemale": "Z380", "amountFemale": 35.1},
                            {"interval": "0-14", "codeTotal": "S060", "amountTotal": 2.9, "codeMale": "S060", "amountMale": 3.1, "codeFemale": "S060", "amountFemale": 2.7},
                            {"interval": "0-14", "codeTotal": "J209", "amountTotal": 1.9, "codeMale": "J209", "amountMale": 2.3, "codeFemale": "P051", "amountFemale": 1.9}];
                 topThreeTable.setData(data);
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
