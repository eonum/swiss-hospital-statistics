define(['helpers/CodeChooser'], function(CodeChooser){
    describe('CodeChooser', function (){

        var data = [{
            firstprop: "firstvalue",
            secondprop: "secondvalue",
            thirdprop: "thirdvalue"}];

        beforeEach(function(){
        });

        it("should be able to return the first property (object has one or more properties)", function (){
            var chooser = new CodeChooser(data);
            var firstProp = chooser.getFirstProperty();

            var expectedResult = "firstprop";

            expect(firstProp).toEqual(expectedResult);
        });
    });
});