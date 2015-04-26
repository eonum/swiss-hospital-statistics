define([
    'View'
], function(
    View
){

    function CatalogChoiceButtonBar(callback){


        var _this = new View('<div></div>');

        var typeButtons = new View('<div class="button-bar"></div>');
        var typeButtonGroup = new View('<ul class="button-group round"></ul>');

        var subtypeButtons = new View('<div class="button-bar"></div>');
        var callback = callback;

        _this.initialize = function(){
            _this.addTypeButtons();
        };

        _this.setGeneralHospitalButtons = function(){

        };

        _this.setSpecialClinicButtons = function(){

        };

        _this.addTypeButtons = function(){
            var general = new $(new View('<a href="#" class="small button secondary">Allgemeine Krankenhäuser</a>'));
            general.click(_this.setGeneralHospitalButtons());
            typeButtonGroup.add(new View('<li></li>').add(general));

            var special = new $(new View('<a href="#" class="small button secondary">Spezialkliniken</a>'));
            general.click(_this.setSpecialClinicButtons());
            typeButtonGroup.add(new View('<li></li>').add(special));


            typeButtons.add(typeButtonGroup);
            _this.append(typeButtons);
        };

        _this.initialize();

        return _this;
    }

    return CatalogChoiceButtonBar;
});