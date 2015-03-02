define([
    'View'
], function (
    View
) {

    function CardView() {
        var _this = new View('<div></div>');
        var content = new View('<div></div>');

        _this.initialize = function () {
            _this.append(content.class('card'));
            _this.class('cardContainer');
        };

        _this.add = override(_this, _this.add, function(element){
            content.add(element);
            return _this;
        });

        _this.initialize();

        return _this;
    }
    return CardView;
});