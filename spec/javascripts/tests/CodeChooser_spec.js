define(['helpers/CodeChooser'], function(CodeChooser){
    describe('CodeChooser', function (){

        var testdata = {
            firstprop: "firstvalue",
            secondprop: "secondvalue",
            thirdprop: "thirdvalue"};

        var ICD_A045 = [ { code : 'A045', description : 'Enteritis durch Campylobacter', year : 2013, icd_code_id : { $oid : '5490074848e276ea1b793f79' }, categorised_data : { categories : { interval : [ { categories : { percentile : [ { categories : {  }, percentile : 5, amount : 3 }, { categories : {  }, percentile : 10, amount : 4 }, { categories : {  }, percentile : 25, amount : 5 }, { categories : {  }, percentile : 50, amount : 7 }, { categories : {  }, percentile : 75, amount : 9 }, { categories : {  }, percentile : 90, amount : 14 }, { categories : {  }, percentile : 95, amount : 18 } ] }, interval : { from : 70 }, n : 377, dad : 8, sa : 4, min : 2, max : 30 } ] } } }, { code : 'A045', description : 'Enteritis durch Campylobacter', year : 2013, icd_code_id : { $oid : '5490074848e276ea1b793f79' }, categorised_data : { categories : { interval : [ { categories : { percentile : [ { categories : {  }, percentile : 5, amount : 3 }, { categories : {  }, percentile : 10, amount : 3 }, { categories : {  }, percentile : 25, amount : 4 }, { categories : {  }, percentile : 50, amount : 5 }, { categories : {  }, percentile : 75, amount : 6 }, { categories : {  }, percentile : 90, amount : 8 }, { categories : {  }, percentile : 95, amount : 9 } ] }, interval : { from : 40, to : 69 }, n : 415, dad : 5, sa : 2, min : 1, max : 19 } ] } } }, { code : 'A045', description : 'Enteritis durch Campylobacter', year : 2013, icd_code_id : { $oid : '5490074848e276ea1b793f79' }, categorised_data : { categories : { interval : [ { categories : { percentile : [ { categories : {  }, percentile : 5, amount : 2 }, { categories : {  }, percentile : 10, amount : 2 }, { categories : {  }, percentile : 25, amount : 2 }, { categories : {  }, percentile : 50, amount : 3 }, { categories : {  }, percentile : 75, amount : 4 }, { categories : {  }, percentile : 90, amount : 5 }, { categories : {  }, percentile : 95, amount : 5 } ] }, interval : { from : 0, to : 14 }, n : 63, dad : 3, sa : 1, min : 2, max : 11 } ] } } }, { code : 'A045', description : 'Enteritis durch Campylobacter', year : 2013, icd_code_id : { $oid : '5490074848e276ea1b793f79' }, categorised_data : { categories : { interval : [ { categories : { percentile : [ { categories : {  }, percentile : 5, amount : 2 }, { categories : {  }, percentile : 10, amount : 2 }, { categories : {  }, percentile : 25, amount : 3 }, { categories : {  }, percentile : 50, amount : 4 }, { categories : {  }, percentile : 75, amount : 5 }, { categories : {  }, percentile : 90, amount : 6 }, { categories : {  }, percentile : 95, amount : 7 } ] }, interval : { from : 15, to : 39 }, n : 322, dad : 3, sa : 1, min : 2, max : 11 } ] } } } ];

        var emptyObject = {};

        beforeEach(function(){
        });

        it("should be able to return the first property (object has one or more properties)", function (){
            var chooser = new CodeChooser(testdata);
            var firstProp = chooser.getFirstProperty(testdata);

            var expectedResult = "firstvalue";

            expect(firstProp).toEqual(expectedResult);
        });

        it("should be able to handle empty objects", function (){
            var chooser = new CodeChooser(testdata);
            var firstProp = chooser.getFirstProperty(emptyObject);

            var expectedResult = undefined;

            expect(firstProp).toEqual(expectedResult);
        });

        //tests the api call
        it("should support async execution of test preparation and expectations", function() {
            var expectedJSON = ICD_A045;
            var actualJSON;
            var flag = false;

            runs(function() {
                flag = false;
                var chooser = new CodeChooser();
                chooser.fetchDatasets("icd", "A045", function(data) {
                    actualJSON = data;
                });

                setTimeout(function() {
                    flag = true;
                }, 50);
            });

            waitsFor(function() {
                return flag;
            }, "The Value should be incremented", 200);

            runs(function() {
                expect(actualJSON).toEqual(expectedJSON);
            });
        });
    });
});