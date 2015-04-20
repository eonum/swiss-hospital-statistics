define(['View'], function(View){
   function AbstractVisualisation(){
       var _this = new View('<div></div>');


       _this.abstractMethod = function () {
           _this.subclassResponsibility();
       };

       return _this;
   }
    return AbstractVisualisation;
});