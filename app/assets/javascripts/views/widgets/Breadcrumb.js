define([
    'View'
], function(
    View
){

    function Step () {
        var _this = new View('<li></li>');
        var link;
        var model;

        _this.render = function () {

        };

        _this.newLink = function () {
            return new View('<a></a>');
        };

        return _this;
    }

    function Breadcrumb() {
        var _this = new View('<ul class="breadcrumbs"></ul>');

        _this.newStep = function () {
            return new Step();
        };

        return _this;
    }

    return Breadcrumb;

});