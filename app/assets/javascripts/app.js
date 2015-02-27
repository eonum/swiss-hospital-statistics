define(['models/CodeModel','views/CodeView','jquery'], function(CodeModel, CodeView, $){
   "use strict";

    function App() {
        var view = new CodeView();
        $(document.body).append(view);
        view.model(new CodeModel());
    }

    return App
});
