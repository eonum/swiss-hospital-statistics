define (['Announcer', 'announcements/OnTextChanged'], function(Announcer, OnTextChanged){
    function CodeModel() {
        var _this = this;

        var text = 'Hello world!';
        var count = 0;
        var announcer = new Announcer();

        _this.text = function (_text) {
            text = _text;

            _this.increment();

            _this.notifyTextChanged();
        };

        _this.getText = function () {
            return text;
        };

        _this.getCount = function () {
            return count;
        };

        _this.increment = function () {
            count++;
        };

        _this.announcer = function() {
            return announcer;
        };

        _this.notifyTextChanged = function () {
            _this.announcer().announce(new OnTextChanged());
        };
    }
    return CodeModel;
});