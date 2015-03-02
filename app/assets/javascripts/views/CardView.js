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
            _this.add(new View('<p>Visualisation Preview</p>')
                .with(function(p){
                    p.class('text-center');
                    p.css('position', 'relative');
                    p.css('top', '50%');
                    p.css('color', '#8B8B8B');
                    p.css('transform', 'translateY(-50%)');
                }));
        };

        _this.click(function(){
            console.log(_this.height());
            console.log(content.height());
            var height = content.height();
            _this.css('z-index', '2');
            _this.css('padding-bottom', '0');
            _this.css('width', _this.width()+'px');
            _this.css('height', height+'px');
            _this.css('position', 'absolute');
            _this.css('left', _this.position().left+'px');
            _this.css('top', _this.position().top+'px');
            content.css('background-color', '#ffffff');
            _this.animate({left: 0, top: 0, width:($('body').width()+'px'),height:($('body').height()+'px')}, 500);
            //_this.height(100+'%');
            //_this.width(100+'%');
        });

        _this.add = override(_this, _this.add, function(element){
            content.add(element);
            return _this;
        });

        _this.initialize();

        return _this;
    }
    return CardView;
});