define([], function(){

    function Catalog() {
        var _this = this;

        _this.loadCodes = function () {
            $.getJSON( 'api/v1/codes', function( data ) {
                console.log(data);
            })
        };

    }
    return Catalog;
});