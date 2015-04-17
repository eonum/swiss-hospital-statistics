define(['helpers/CodeChooser'], function(CodeChooser){
    describe('CodeChooser', function (){

        var testdata = {
            firstprop: "firstvalue",
            secondprop: "secondvalue",
            thirdprop: "thirdvalue"};

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

        /*it("should be able to fetch an ICD dataset", function(){
            var chooser = new CodeChooser();
            chooser.fetchDatasets("icd", "A045", function(data) {
                var expectedJSON = "adföafg";

                expect(dataContainer).toEqual(expectedJSON);
            });
        });*/

        it("should support async execution of test preparation and expectations", function() {
            runs(function() {
                flag = false;
                value = 0;

                setTimeout(function() {
                    flag = true;
                }, 500);
            });

            waitsFor(function() {
                value++;
                return flag;
            }, "The Value should be incremented", 750);

            runs(function() {
                expect(value).toBeGreaterThan(0);
            });
        });
    });
});