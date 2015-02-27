define(['announcements/OnTextChanged', 'jquery'], function(OnTextChanged, $){
   function CodeView() {
       var _this = $('<p></p>');

       var model;

       _this.model = function(_model) {
           model = _model;
           model.announcer().onSendTo(OnTextChanged, _this.onTextChanged, _this);

           _this.onTextChanged();
       };

       _this.onTextChanged = function (ann) {
            _this.html(model.getText()+model.getCount());
       };

       _this.click(function(){
           model.text('Clicked!');
       });

       return _this;
   }
    return CodeView;
});