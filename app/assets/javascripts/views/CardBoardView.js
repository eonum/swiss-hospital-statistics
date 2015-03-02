define([
    'View'
], function (
    View
) {

    function CardBoardView () {
        var _this = new View('<ul></ul>');

        _this.initialize = function () {
            _this
                .class('small-block-grid-2')
                .class('medium-block-grid-3')
                .class('large-block-grid-4')
                .with(function(){
                    _this.css('padding', '0');
                    _this.css('margin', '0');
                });
        };

        _this.add = override(_this, _this.add, function(element){
            var container = new View('<li></li>');
            this.super(container.add(element));
            return _this;
        });

        _this.initialize();

        return _this;
    }

    return CardBoardView;
});